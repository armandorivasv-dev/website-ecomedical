// Importa NextResponse para manejar respuestas en Next.js API routes
import { NextResponse } from 'next/server';
// Importa el método pipeline de la librería transformers para procesamiento de texto
import { pipeline } from '@xenova/transformers';
// Importa el módulo fs/promises para operaciones de archivos asíncronas
import fs from 'fs/promises';
// Importa el módulo path para manipulación de rutas de archivos
import path from 'path';
// Importa la librería natural para procesamiento de lenguaje natural (NLP)
import natural from 'natural';

// Define la ruta absoluta al archivo de conocimiento
const KNOWLEDGE_PATH = path.resolve(process.cwd(), 'src/knowledge/knowledge.json');
// Define la ruta absoluta al archivo de vectores
const VECTORS_PATH = path.resolve(process.cwd(), 'src/knowledge/vectors.json');
// Define el nombre del modelo a utilizar para embeddings
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
// Define el umbral de similitud para considerar una respuesta válida
const SIMILARITY_THRESHOLD = 0.5;
// Mensaje de respuesta por defecto si no se encuentra una respuesta adecuada
const FALLBACK_ANSWER =
  'Lo siento, su pregunta no se encuentra en nuestra base de conocimientos. Si deseas contactar con un médico especialista que responda tu inquietud, envía un mensaje a nuestro WhatsApp en el botón: AGENDA UNA CITA.';
// Lista de palabras clave para identificar intenciones relacionadas con precios
const PRICE_INTENT_KEYWORDS = [
  'precio',
  'que precio',
  'cual precio',
  'cual es el precio',
  'precios',
  'que precios',
  'cuales precios',
  'valor',
  'que valor',
  'cual valor',
  'cual es el valor',
  'valores',
  'que valores',
  'cuales valores',
  'costo',
  'que costo',
  'cual costo',
  'cual es el costo',
  'costos',
  'que costos',
  'cuales costos',
  'vale',
  'cuanto vale',
  'cuesta',
  'cuanto cuesta',
  'cuánto cuesta',
];

// --- Rate Limiting  ---
// Define la ventana de tiempo para el rate limit en milisegundos (1 minuto)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
// Define el número máximo de solicitudes permitidas por ventana de tiempo
const RATE_LIMIT_MAX_REQUESTS = 10;
// Mapa para almacenar el estado de rate limit por IP
const rateLimitMap = new Map();

// Función para obtener la IP del cliente desde la solicitud
const getClientIp = (req) => {
  // Obtiene el header 'x-forwarded-for' si existe
  const xff = req.headers.get('x-forwarded-for');
  // Si existe, toma la primera IP, si no, usa req.ip o 'unknown'
  return xff ? xff.split(',')[0].trim() : req.ip ?? 'unknown';
};

// Función para verificar si una IP ha excedido el límite de solicitudes
const isRateLimited = (ip) => {
  // Obtiene el timestamp actual
  const now = Date.now();
  // Obtiene la entrada del mapa o crea una nueva si no existe
  const entry = rateLimitMap.get(ip) ?? { count: 0, startTime: now };

  // Si ha pasado la ventana de tiempo, reinicia el contador
  if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  // Si se ha alcanzado el límite, retorna true
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  // Incrementa el contador y actualiza el mapa
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return false;
};

// --- Funciones de Utilidad  ---
// Calcula la similitud coseno entre dos vectores numéricos
const cosineSimilarity = (vectorA, vectorB) => {
  // Calcula el producto punto de los dos vectores
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  // Calcula la norma (magnitud) del primer vector
  const normA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  // Calcula la norma (magnitud) del segundo vector
  const normB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  // Retorna la similitud coseno
  return dotProduct / (normA * normB || 1);
};

// Limpia y aplica stemming a un texto usando un stemmer dado
const cleanAndStem = (text, stemmer) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]|_/g, '')
    .split(/\s+/)
    .map((word) => stemmer.stem(word))
    .filter(Boolean);

// Normaliza un texto eliminando acentos y caracteres especiales
const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]|_/g, '');

// --- Lógica de Fallback ---
// Busca coincidencias parciales por palabras clave en el conocimiento
const keywordPartialFallback = (query, knowledge) => {
  // Usa el stemmer en español de la librería natural
  const stemmer = natural.PorterStemmerEs;
  // Aplica limpieza y stemming a la consulta
  const queryStems = cleanAndStem(query, stemmer);

  // Variables para almacenar el mejor match y su puntuación
  let bestMatch = null;
  let bestScore = 0;

  // Itera sobre cada ítem del conocimiento
  for (const item of knowledge) {
    // Extrae el contenido y etiquetas del ítem
    const { content, labels = [] } = item;
    // Aplica limpieza y stemming al contenido y etiquetas
    const contentStems = cleanAndStem(content, stemmer);
    const labelStems = labels.flatMap((label) => cleanAndStem(label, stemmer));
    // Combina todos los stems
    const allStems = [...contentStems, ...labelStems];
    // Calcula la puntuación como el número de stems coincidentes
    const score = queryStems.filter((stem) => allStems.includes(stem)).length;

    // Si la puntuación es mejor que la anterior, actualiza el mejor match
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  // Si se encontró un match, lo retorna
  if (bestScore > 0) return bestMatch;

  // Normaliza la consulta para comparación de texto
  const normalizedQuery = normalizeText(query);
  // Busca coincidencias en las etiquetas
  for (const item of knowledge) {
    const { labels = [] } = item;
    if (labels.some((label) => normalizeText(label).includes(normalizedQuery))) {
      return item;
    }
  }

  // Busca coincidencias por raíz de la consulta en contenido y etiquetas
  const root = query.trim().toLowerCase().slice(0, 5);
  for (const item of knowledge) {
    const { content, labels = [] } = item;
    if (normalizeText(content).includes(root) || labels.some((label) => normalizeText(label).includes(root))) {
      return item;
    }
  }

  // Si no se encuentra nada, retorna null
  return null;
};

// --- Singleton para el Pipeline de Infobot ---
// Clase para manejar la carga y uso del modelo y los datos de conocimiento
class ChatPipeline {
  // Instancia única de la clase (singleton)
  static instance = null;
  // Promesa de carga para evitar cargas simultáneas
  static loadingPromise = null;

  // Constructor que recibe el embedder, el conocimiento y los vectores
  constructor(embedder, knowledge, vectors) {
    this.embedder = embedder;
    this.knowledge = knowledge;
    this.vectors = vectors;
  }

  // Método estático para obtener la instancia única de la clase
  static async getInstance() {
    // Si ya existe la instancia, la retorna
    if (this.instance) {
      return this.instance;
    }

    // Si ya se está cargando, retorna la promesa existente
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    // Inicia la carga del modelo y los datos de conocimiento y vectores
    this.loadingPromise = (async () => {
      try {
        // Carga el modelo y los archivos en paralelo
        const [embedder, knowledgeData, vectorsData] = await Promise.all([
          pipeline('feature-extraction', MODEL_NAME),
          fs.readFile(KNOWLEDGE_PATH, 'utf-8'),
          fs.readFile(VECTORS_PATH, 'utf-8'),
        ]);

        // Parsea los datos de conocimiento y vectores
        const knowledge = JSON.parse(knowledgeData);
        const vectors = JSON.parse(vectorsData);

        // Crea la instancia única de la clase
        this.instance = new ChatPipeline(embedder, knowledge, vectors);
        return this.instance;
      } catch (error) {
        // Si ocurre un error, lo muestra y permite reintentos
        console.error('Error al inicializar el pipeline del chat:', error);
        this.loadingPromise = null; // Permitir reintentos
        throw error;
      }
    })();

    // Retorna la promesa de carga
    return this.loadingPromise;
  }

  // Método para buscar la mejor respuesta a una consulta
  async search(query) {
    // Normaliza la consulta para comparación de texto
    const normalizedQuery = normalizeText(query);
    // Determina si la consulta es sobre precios
    const isPriceQuery = PRICE_INTENT_KEYWORDS.some((keyword) => normalizedQuery.includes(keyword));

    // 1. Enfoque Híbrido: Intentar encontrar el tema por keywords
    let foundItemByKeyword = null;
    // Busca coincidencias por palabras clave en el conocimiento
    for (const item of this.knowledge) {
      if (item.keywords?.some((kw) => normalizedQuery.includes(kw))) {
        // Si coincide con la intención de precio y el tipo es 'price'
        if (isPriceQuery && item.type === 'price') {
          foundItemByKeyword = item;
          break;
        }
        // Si no es de precio y el tipo es 'item'
        if (!isPriceQuery && item.type === 'item') {
          foundItemByKeyword = item;
          break;
        }
      }
    }

    // Si se encontró un match por keyword, retorna el contenido
    if (foundItemByKeyword) {
      return foundItemByKeyword.content;
    }

    // 2. Si el enfoque híbrido falla, recurrimos a la búsqueda semántica completa (lógica anterior mejorada)
    // Obtiene el embedding de la consulta usando el modelo
    const output = await this.embedder(query, { pooling: 'mean', normalize: true });
    // Convierte el resultado a un array plano
    const questionVector = [...output.data];

    // Define los tipos de búsqueda según la intención
    let searchTypes = [];
    if (isPriceQuery) {
      searchTypes = ['price'];
    } else {
      // Prioriza 'item', luego 'general'
      searchTypes = ['item', 'general'];
    }

    // Inicializa el mejor match global
    let bestMatch = { score: -Infinity, id: null };

    // Itera sobre los tipos de búsqueda
    for (const type of searchTypes) {
      // Filtra el conocimiento relevante por tipo
      const relevantKnowledge = this.knowledge.filter((item) => item.type === type);
      // Obtiene los IDs relevantes
      const relevantKnowledgeIds = new Set(relevantKnowledge.map((item) => item.id));
      // Filtra los vectores relevantes por ID
      const relevantVectors = this.vectors.filter((v) => relevantKnowledgeIds.has(v.id));

      // Si no hay vectores relevantes, continúa
      if (relevantVectors.length === 0) {
        continue;
      }

      // Inicializa el mejor match para este tipo
      let typeBestMatch = { score: -Infinity, id: null };
      // Busca el vector más similar
      for (const { id, vector } of relevantVectors) {
        const score = cosineSimilarity(questionVector, vector);
        if (score > typeBestMatch.score) {
          typeBestMatch = { score, id };
        }
      }

      // Actualiza el mejor match global si es mejor
      if (typeBestMatch.score > bestMatch.score) {
        bestMatch = typeBestMatch;
      }

      // Si se encuentra una coincidencia suficientemente buena en 'item', la usa
      if (!isPriceQuery && type === 'item' && bestMatch.score >= SIMILARITY_THRESHOLD) {
        break; // Sale del bucle solo si es una buena coincidencia en 'item'
      }
    }

    // Si la mejor coincidencia no supera el umbral, usa el fallback
    if (bestMatch.score < SIMILARITY_THRESHOLD) {
      // El fallback busca en TODO el conocimiento, no solo el filtrado
      const fallbackItem = keywordPartialFallback(query, this.knowledge);
      return fallbackItem ? fallbackItem.content : FALLBACK_ANSWER;
    }

    // Retorna el contenido del mejor match encontrado o el fallback si no existe
    return this.knowledge.find(({ id }) => id === bestMatch.id)?.content ?? FALLBACK_ANSWER;
  }
}

// Exporta el handler POST para la API de Next.js
export const POST = async (req) => {
  // Obtiene la IP del cliente
  const clientIp = getClientIp(req);

  // Verifica si la IP está limitada por rate limit
  if (isRateLimited(clientIp)) {
    // Retorna un error 429 si se excede el límite
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo.' },
      { status: 429 }
    );
  }

  try {
    // Extrae la consulta (query) del cuerpo de la solicitud
    const { query } = await req.json();

    // Si no se proporciona la consulta, retorna un error 400
    if (!query) {
      return NextResponse.json({ error: 'La consulta (query) es requerida.' }, { status: 400 });
    }

    // Obtenemos la instancia del pipeline (se cargará solo la primera vez)
    const chatInstance = await ChatPipeline.getInstance();
    // Busca la respuesta a la consulta usando el pipeline
    const answer = await chatInstance.search(query);

    // Retorna la respuesta encontrada en formato JSON
    return NextResponse.json({ answer });
  } catch (error) {
    // Si ocurre un error, lo muestra en consola y retorna un error 500
    console.error('Error interno del chatbot:', error);
    return NextResponse.json({ error: 'Error interno del chatbot.' }, { status: 500 });
  }
};
