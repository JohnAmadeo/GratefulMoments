/**
 * Database client initialization for GratefulMoments
 *
 * This file initializes the SQLite database using expo-sqlite and wraps it
 * with Drizzle ORM for type-safe database operations. This replaces the
 * SwiftData ModelContainer from the original Swift app.
 */

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { moments } from './schema';

/**
 * Database name
 * This matches the persistent storage approach of the Swift app's ModelContainer
 */
const DATABASE_NAME = 'gratefulmoments.db';

/**
 * Open the SQLite database
 * Uses expo-sqlite v14+ API with openDatabaseSync
 */
const expoDb = SQLite.openDatabaseSync(DATABASE_NAME);

/**
 * Drizzle ORM client
 * Provides type-safe database operations for the moments table
 * This is the equivalent of SwiftData's ModelContext in the Swift app
 */
export const db = drizzle(expoDb, { schema: { moments } });

/**
 * Initialize database schema
 * Creates the moments table if it doesn't exist
 * This should be called when the app starts
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Create the moments table if it doesn't exist
    await expoDb.execAsync(`
      CREATE TABLE IF NOT EXISTS moments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        note TEXT NOT NULL,
        image_data TEXT,
        timestamp INTEGER NOT NULL
      );
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
