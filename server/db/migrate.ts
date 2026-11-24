import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transakcia, type Databaza } from './connection';

const PRIECINOK_MIGRACII = fileURLToPath(new URL('./migrations', import.meta.url));

/**
 * Spustí migrácie zo súborov server/db/migrations/*.sql, ktoré ešte v databáze neboli.
 * Spúšťajú sa v abecednom poradí názvov súborov. Vráti názvy práve spustených migrácií.
 */
export function spustiMigracie(db: Databaza, priecinok = PRIECINOK_MIGRACII): string[] {
  db.exec(`CREATE TABLE IF NOT EXISTS migracie (
    nazov TEXT PRIMARY KEY,
    spustena TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  const riadky = db.prepare('SELECT nazov FROM migracie').all() as { nazov: string }[];
  const hotove = new Set(riadky.map((r) => r.nazov));
  const nove = readdirSync(priecinok)
    .filter((subor) => subor.endsWith('.sql') && !hotove.has(subor))
    .sort();

  for (const subor of nove) {
    const sql = readFileSync(join(priecinok, subor), 'utf8');
    try {
      transakcia(db, () => {
        db.exec(sql);
        db.prepare('INSERT INTO migracie (nazov) VALUES (?)').run(subor);
      });
    } catch (chyba) {
      throw new Error(`Migrácia ${subor} zlyhala: ${(chyba as Error).message}`, { cause: chyba });
    }
  }
  return nove;
}
