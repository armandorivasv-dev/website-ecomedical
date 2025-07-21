import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';
import fs from 'fs/promises';
import path from 'path';
import natural from 'natural';

const KNOWLEDGE_PATH = path.resolve(process.cwd(), 'src/knowledge/knowledge.json');
const VECTORS_PATH = path.resolve(process.cwd(), 'src/knowledge/vectors.json');
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
const SIMILARITY_THRESHOLD = 0.5;

// Constantes para la limitación de tasa (Rate Limiting)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map();

const getClientIp = (req) => {
  const xff = req.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0].trim() : req.ip ?? 'unknown';
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
  return dotProduct / (normA * normB || 1);
};

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
    const { labels = [] } = item;
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

export const POST = async (req) => {
  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo.' },
      { status: 429 }
    );
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'La consulta (query) es requerida.' }, { status: 400 });
    }

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
        return NextResponse.json({ answer: fallbackItem.content });
      }
      return NextResponse.json({
        answer: 'Lo siento, su pregunta no se encuentra en nuestra base de conocimientos.',
      });
    }

    const answer = knowledge.find(({ id }) => id === bestMatch.id)?.content;
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error interno del chatbot:', error);
    return NextResponse.json({ error: 'Error interno del chatbot.' }, { status: 500 });
  }
};
