import { join } from 'path';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';

const DICTIONARIES_DIR = join(__dirname, '..', 'dictionaries');
const DATA_FILE_PATH = join(__dirname, '..', 'src', 'data.json');

function getDictionaryFromFile(filename: string): string[] {
  if (!existsSync(filename)) {
    return [];
  }
  return readFileSync(join(filename))
    .toString()
    .trim()
    .split('\n');
}

function getLangDictionary(lang: string): { clean: string[]; dirty: string[] } {
  const langDir = join(DICTIONARIES_DIR, lang);
  const clean = getDictionaryFromFile(join(langDir, `clean.${lang}.txt`));
  const dirty = getDictionaryFromFile(join(langDir, `dirty.${lang}.txt`));
  return {
    clean,
    dirty,
  };
}

const langList = readdirSync(DICTIONARIES_DIR);
const dictionaryLangMap = langList.reduce((map, lang) => {
  if (lang && lang.length === 2) {
    const dictionary = getLangDictionary(lang);
    map[lang] = dictionary;
  }
  return map;
}, {});

writeFileSync(DATA_FILE_PATH, JSON.stringify(dictionaryLangMap, null, 0));
