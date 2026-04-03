// api/get-students.js
// يُرجع قائمة طلاب شعبة معينة من ملفات JSON الثابتة

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { group, section } = req.query;
  // group: 'أ' or 'ب'   section: '1' .. '11'

  if (!group || !section) {
    return res.status(400).json({ error: 'group and section are required' });
  }

  const folder = group === 'أ' ? 'group-a' : 'group-b';
  const sectionNum = parseInt(section);

  if (isNaN(sectionNum) || sectionNum < 1 || sectionNum > 11) {
    return res.status(400).json({ error: 'Invalid section number (1–11)' });
  }

  try {
    const filePath = join(__dirname, 'data', folder, `section-${sectionNum}.json`);
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ error: 'Section data not found' });
  }
}
