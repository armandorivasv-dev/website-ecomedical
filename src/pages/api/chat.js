import { pipeline } from '@xenova/transformers';
import fs from 'fs/promises';
import path from 'path';
import natural from 'natural';

const KNOWLEDGE_PATH = path.resolve(process.cwd(), 'src/knowledge/knowledge.json');
const VECTORS_PATH = path.resolve(process.cwd(), 'src/knowledge/vectors.json');
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
const SIMILARITY_THRESHOLD = 0.5;

// Rate limiting constants
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map();

const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.socket?.remoteAddress ?? 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) ?? { count: 0, startTime: now };
  if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return false;
};

const cosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  const normA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB ?? 1);
};

const isShortQuery = (query) => query.trim().split(/\s+/).length <= 2;

const cleanAndStem = (text, stemmer) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]|_/g, '')
    .split(/\s+/)
    .map((word) => stemmer.stem(word))
    .filter(Boolean);

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]|_/g, '');

const keywordPartialFallback = (query, knowledge) => {
  const stemmer = natural.PorterStemmerEs;
  const queryStems = cleanAndStem(query, stemmer);

  let bestMatch = null;
  let bestScore = 0;
  for (const item of knowledge) {
    const { content, labels = [] } = item;
    const contentStems = cleanAndStem(content, stemmer);
    const labelStems = labels.flatMap((label) => cleanAndStem(label, stemmer));
    const allStems = [...contentStems, ...labelStems];
    const score = queryStems.filter((stem) => allStems.includes(stem)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }
  if (bestScore > 0) return bestMatch;

  const normalizedQuery = normalizeText(query);
  for (const item of knowledge) {
    const { content, labels = [] } = item;
    if (labels.some((label) => normalizeText(label).includes(normalizedQuery))) {
      return item;
    }
  }

  const root = query.trim().toLowerCase().slice(0, 5);
  for (const item of knowledge) {
    const { content, labels = [] } = item;
    if (normalizeText(content).includes(root) || labels.some((label) => normalizeText(label).includes(root))) {
      return item;
    }
  }

  return null;
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo.',
    });
  }

  try {
    const { query } = req.body;

    const [vectorsData, knowledgeData] = await Promise.all([
      fs.readFile(VECTORS_PATH, 'utf-8'),
      fs.readFile(KNOWLEDGE_PATH, 'utf-8'),
    ]);
    const vectors = JSON.parse(vectorsData);
    const knowledge = JSON.parse(knowledgeData);

    const embedder = await pipeline('feature-extraction', MODEL_NAME);
    const output = await embedder(query, { pooling: 'mean', normalize: true });
    const questionVector = [...output.data];

    let bestMatch = { score: -Infinity, id: null };
    for (const { id, vector } of vectors) {
      const score = cosineSimilarity(questionVector, vector);
      if (score > bestMatch.score) {
        bestMatch = { score, id };
      }
    }

    if (bestMatch.score < SIMILARITY_THRESHOLD) {
      const fallbackItem = keywordPartialFallback(query, knowledge);
      if (fallbackItem) {
        return res.status(200).json({ answer: fallbackItem.content });
      }
      return res.status(200).json({
        answer: 'Lo siento, su pregunta no se encuentra en nuestra base de conocimientos.',
      });
    }

    const answer = knowledge.find(({ id }) => id === bestMatch.id)?.content;
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error interno del chatbot:', error);
    return res.status(500).json({ error: 'Error interno del chatbot.' });
  }
};

export default handler;

// import { NextResponse } from 'next/server';
// import { pipeline } from '@xenova/transformers';
// import fs from 'fs/promises';
// import path from 'path';
// import natural from 'natural';

// // Definición de rutas y constantes principales
// const KNOWLEDGE_PATH = path.resolve(process.cwd(), 'src/knowledge/knowledge.json');
// const VECTORS_PATH = path.resolve(process.cwd(), 'src/knowledge/vectors.json');
// const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
// const SIMILARITY_THRESHOLD = 0.5;

// // Calcula la similitud coseno entre dos vectores numéricos
// const cosineSimilarity = (vectorA, vectorB) => {
//   const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
//   const normA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
//   const normB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
//   return dotProduct / (normA * normB ?? 1);
// };

// // Determina si la consulta es corta (1 o 2 palabras)
// const isShortQuery = (query) => query.trim().split(/\s+/).length <= 2;

// // Limpia el texto y aplica stemming para obtener las raíces de las palabras
// const cleanAndStem = (text, stemmer) =>
//   text
//     .toLowerCase()
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
//     .replace(/[^\w\s]|_/g, '') // Elimina signos de puntuación
//     .split(/\s+/)
//     .map((word) => stemmer.stem(word)) // Aplica stemming
//     .filter(Boolean);

// // Normaliza el texto eliminando tildes y signos de puntuación
// const normalizeText = (text) =>
//   text
//     .toLowerCase()
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^\w\s]|_/g, '');

// // Fallback: busca el fragmento más relevante si la similitud es baja y la consulta es corta
// const keywordPartialFallback = (query, knowledge) => {
//   const stemmer = natural.PorterStemmerEs;
//   const queryStems = cleanAndStem(query, stemmer);

//   // 1. Busca el fragmento con más coincidencias de raíces (stems)
//   let bestMatch = null;
//   let bestScore = 0;
//   for (const { content } of knowledge) {
//     const contentStems = cleanAndStem(content, stemmer);
//     // Cuenta cuántos stems de la consulta están en el contenido
//     const score = queryStems.filter((stem) => contentStems.includes(stem)).length;
//     if (score > bestScore) {
//       bestScore = score;
//       bestMatch = content;
//     }
//   }
//   if (bestScore > 0) return bestMatch;

//   // 2. Si no hay match por stemming, busca por substring de raíz (primeros 5 caracteres)
//   const root = query.trim().toLowerCase().slice(0, 5);
//   for (const { content } of knowledge) {
//     if (normalizeText(content).includes(root)) {
//       return content;
//     }
//   }

//   // 3. Si tampoco, busca por substring normalizado completo
//   const normalizedQuery = normalizeText(query);
//   for (const { content } of knowledge) {
//     if (normalizeText(content).includes(normalizedQuery)) {
//       return content;
//     }
//   }

//   // Si no encuentra nada, retorna null
//   return null;
// };

// // Handler principal del endpoint POST
// export const POST = async (req) => {
//   try {
//     // Extrae la consulta del usuario del body de la petición
//     const { query } = await req.json();

//     // Lee los vectores y la base de conocimiento en paralelo
//     const [vectorsData, knowledgeData] = await Promise.all([
//       fs.readFile(VECTORS_PATH, 'utf-8'),
//       fs.readFile(KNOWLEDGE_PATH, 'utf-8'),
//     ]);
//     const vectors = JSON.parse(vectorsData);
//     const knowledge = JSON.parse(knowledgeData);

//     // Genera el embedding de la consulta usando el modelo especificado
//     const embedder = await pipeline('feature-extraction', MODEL_NAME);
//     const output = await embedder(query, { pooling: 'mean', normalize: true });
//     const questionVector = [...output.data];

//     // Busca el fragmento más similar en la base de conocimiento usando similitud coseno
//     let bestMatch = { score: -Infinity, id: null };
//     for (const { id, vector } of vectors) {
//       const score = cosineSimilarity(questionVector, vector);
//       if (score > bestMatch.score) {
//         bestMatch = { score, id };
//       }
//     }

//     // Si la similitud es baja y la consulta es corta, usa el fallback por palabras clave/raíz
//     if (bestMatch.score < SIMILARITY_THRESHOLD) {
//       if (isShortQuery(query)) {
//         const fallbackAnswer = keywordPartialFallback(query, knowledge);
//         if (fallbackAnswer) {
//           return NextResponse.json({ answer: fallbackAnswer });
//         }
//       }
//       // Si no hay respuesta relevante, responde con mensaje estándar
//       return NextResponse.json({
//         answer: 'Lo siento, su pregunta no se encuentra en nuestra base de conocimientos.',
//       });
//     }

//     // Si la similitud es suficiente, devuelve la respuesta relevante
//     const answer = knowledge.find(({ id }) => id === bestMatch.id)?.content;
//     return NextResponse.json({ answer });
//   } catch (error) {
//     // Manejo de errores: log y respuesta de error
//     console.error('Error interno del chatbot:', error);
//     return NextResponse.json({ error: 'Error interno del chatbot.' }, { status: 500 });
//   }
// };

// import { NextResponse } from 'next/server';
// import { pipeline } from '@xenova/transformers';
// import fs from 'fs/promises';
// import path from 'path';
// import natural from 'natural';

// const KNOWLEDGE_PATH = path.resolve(process.cwd(), 'src/knowledge/knowledge.json');
// const VECTORS_PATH = path.resolve(process.cwd(), 'src/knowledge/vectors.json');
// const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

// // 1. Define tu umbral de similitud
// const SIMILARITY_THRESHOLD = 0.5;

// const cosineSimilarity = (vectorA, vectorB) => {
//   const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
//   const normA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
//   const normB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
//   return dotProduct / (normA * normB ?? 1);
// };

// const isShortQuery = (query) => query.trim().split(/\s+/).length <= 2;

// const keywordFallback = (query, knowledge) => {
//   const lowerQuery = query.trim().toLowerCase();
//   const matches = knowledge.filter(({ content }) => content.toLowerCase().includes(lowerQuery));
//   return matches.length > 0 ? matches[0].content : null;
// };

// const stemmer = natural.PorterStemmerEs;

// const keywordPartialFallback = (query, knowledge) => {
//   const lowerQuery = query.trim().toLowerCase();
//   const queryWords = lowerQuery.split(/\s+/).map((word) => stemmer.stem(word));
//   const matches = knowledge.filter(({ content }) => {
//     const lowerContent = content.toLowerCase();
//     const contentWords = lowerContent.split(/\s+/).map((word) => stemmer.stem(word));
//     return queryWords.some((queryStem) => contentWords.includes(queryStem));
//   });
//   return matches.length > 0 ? matches[0].content : null;
// };

// export const POST = async (req) => {
//   try {
//     const { query } = await req.json();

//     // Cargar los embeddings y la base de conocimiento
//     const [vectorsData, knowledgeData] = await Promise.all([
//       fs.readFile(VECTORS_PATH, 'utf-8'),
//       fs.readFile(KNOWLEDGE_PATH, 'utf-8'),
//     ]);
//     const vectors = JSON.parse(vectorsData);
//     const knowledge = JSON.parse(knowledgeData);

//     // Generar el embedding de la pregunta
//     const embedder = await pipeline('feature-extraction', MODEL_NAME);
//     const output = await embedder(query, { pooling: 'mean', normalize: true });
//     const questionVector = [...output.data];

//     // Buscar el fragmento más similar
//     let bestMatch = { score: -Infinity, id: null };
//     for (const { id, vector } of vectors) {
//       const score = cosineSimilarity(questionVector, vector);
//       if (score > bestMatch.score) {
//         bestMatch = { score, id };
//       }
//     }

//     // 2. Comprobar si la mejor puntuación supera el umbral
//     if (bestMatch.score < SIMILARITY_THRESHOLD) {
//       if (isShortQuery(query)) {
//         const fallbackAnswer = keywordFallback(query, knowledge) ?? keywordPartialFallback(query, knowledge);
//         if (fallbackAnswer) {
//           return NextResponse.json({ answer: fallbackAnswer });
//         }
//       }
//       return NextResponse.json({
//         answer: 'Lo siento, su pregunta no se encuentra en nuestra base de conocimientos.',
//       });
//     }

//     // 3. Si la puntuación es buena, devolver la respuesta relevante
//     const answer = knowledge.find(({ id }) => id === bestMatch.id)?.content;
//     return NextResponse.json({ answer });
//   } catch (error) {
//     console.error('Error interno del chatbot:', error);
//     return NextResponse.json({ error: 'Error interno del chatbot.' }, { status: 500 });
//   }
// };
// };
