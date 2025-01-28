import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  // await database.execAsync('DELETE FROM customers');
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT NOT NULL,
      business_name TEXT NOT NULL,
      address TEXT NOT NULL,
      photo TEXT
    );
  `)
}