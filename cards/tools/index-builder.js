#!/usr/bin/env node
/* Build card indexes for fast lookup.
   Usage: node tools/index-builder.js
*/

import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'cards');
const INDEX_DIR = path.join(ROOT, 'index');
const TYPES = ['waifus', 'supports', 'traps'];

async function readJson(fp) {
  const raw = await fs.readFile(fp, 'utf8');
  return JSON.parse(raw);
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(full);
  }
  return out;
}

function slim(card) {
  return {
    id: card.id,
    type: card.type,
    name: card.name,
    archetype: card.archetype,
    rarity: card.rarity,
    tags: card.tags || [],
    set: card.set,
    affection: card.affection,
    mood: card.mood?.thresholds,
    cost: card.cost
  };
}

async function main() {
  await fs.mkdir(INDEX_DIR, { recursive: true });
  const all = [];
  const byId = {}; const byTag = {}; const byArchetype = {}; const byType = {};

  for (const t of TYPES) {
    const base = path.join(ROOT, t);
    try {
      const files = await walk(base);
      for (const f of files) {
        const card = await readJson(f);
        const data = slim(card);
        all.push(data);
        byId[data.id] = data;
        (byType[data.type] ||= []).push(data);
        if (data.archetype) (byArchetype[data.archetype] ||= []).push(data);
        for (const tag of data.tags || []) (byTag[tag] ||= []).push(data);
      }
    } catch (err) {
      // ignore missing type dirs
    }
  }

  const write = (name, obj) => fs.writeFile(path.join(INDEX_DIR, name), JSON.stringify(obj, null, 2));

  await write('all.json', all);
  await write('by-id.json', byId);
  await write('by-type.json', byType);
  await write('by-tag.json', byTag);
  await write('by-archetype.json', byArchetype);

  console.log(`Indexed ${all.length} cards.`);
}

main().catch(e => { console.error(e); process.exit(1); });
