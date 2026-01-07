/**
 * Database CRUD operations for GratefulMoments
 *
 * This file implements all database operations for Moment records,
 * replacing SwiftData's ModelContext operations from the Swift app.
 * All operations use Drizzle ORM for type-safe database access.
 */

import { eq, asc } from 'drizzle-orm';
import { db } from './client';
import { moments } from './schema';
import type { Moment, CreateMomentInput } from './types';
import { STUDY_IMAGE_BASE64, RELAX_IMAGE_BASE64, CONCERT_IMAGE_BASE64 } from './sampleData';

/**
 * Get all moments from the database
 *
 * Returns moments sorted by timestamp in ascending order to match
 * the SwiftUI @Query(sort: \Moment.timestamp) behavior in Moments.swift:7
 *
 * @returns Promise<Moment[]> Array of all moments, sorted by timestamp ASC
 */
export async function getAllMoments(): Promise<Moment[]> {
  const result = await db
    .select()
    .from(moments)
    .orderBy(asc(moments.timestamp));

  return result as Moment[];
}

/**
 * Get a single moment by ID
 *
 * @param id Moment ID
 * @returns Promise<Moment | undefined> The moment if found, undefined otherwise
 */
export async function getMomentById(id: number): Promise<Moment | undefined> {
  const result = await db
    .select()
    .from(moments)
    .where(eq(moments.id, id))
    .limit(1);

  return result[0] as Moment | undefined;
}

/**
 * Create a new moment
 *
 * Inserts a new moment into the database and returns the created record
 * with its auto-generated ID. Equivalent to SwiftData's context.insert()
 *
 * @param input Moment data (without id, which is auto-generated)
 * @returns Promise<Moment> The created moment with its generated ID
 */
export async function createMoment(input: CreateMomentInput): Promise<Moment> {
  const result = await db
    .insert(moments)
    .values({
      title: input.title,
      note: input.note,
      imageData: input.imageData,
      timestamp: input.timestamp,
    })
    .returning();

  return result[0] as Moment;
}

/**
 * Delete a moment by ID
 *
 * Removes a moment from the database. Equivalent to SwiftData's context.delete()
 *
 * @param id Moment ID to delete
 * @returns Promise<void>
 */
export async function deleteMoment(id: number): Promise<void> {
  await db.delete(moments).where(eq(moments.id, id));
}

/**
 * Sample moments data
 *
 * Mirrors Moment.sampleData from Models/Moment.swift (lines 36-60)
 * with the following 5 moments:
 * 1. "🍅🥳" - Picked my first homegrown tomato! (no image)
 * 2. "Passed the test!" - The chem exam was tough... (Study image)
 * 3. "Down time" - So grateful for a relaxing evening... (Relax image)
 * 4. "Family ❤️" - (empty note, no image)
 * 5. "Rock on!" - Went to a great concert with Blair 🎶 (Concert image)
 *
 * Images are stored as base64 strings to match SwiftData's Data? type
 * and follow Design Decision #2 (Image Data Storage Strategy)
 */
const sampleMomentsData: CreateMomentInput[] = [
  {
    title: '🍅🥳',
    note: 'Picked my first homegrown tomato!',
    imageData: null,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
  },
  {
    title: 'Passed the test!',
    note: "The chem exam was tough, but I think I did well 🙌 I'm so glad I reached out to Guillermo and Lee for a study session. It really helped!",
    imageData: STUDY_IMAGE_BASE64,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
  },
  {
    title: 'Down time',
    note: 'So grateful for a relaxing evening after a busy week.',
    imageData: RELAX_IMAGE_BASE64,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
  {
    title: 'Family ❤️',
    note: '',
    imageData: null,
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    title: 'Rock on!',
    note: 'Went to a great concert with Blair 🎶',
    imageData: CONCERT_IMAGE_BASE64,
    timestamp: Date.now(), // Now
  },
];

/**
 * Initialize sample data
 *
 * Checks if the database is empty and seeds it with the 5 sample moments
 * if needed. This is useful for development and testing, similar to how
 * the Swift app's DataContainer can optionally load sample data.
 *
 * @returns Promise<void>
 */
export async function initializeSampleData(): Promise<void> {
  // Check if database already has data
  const existingMoments = await getAllMoments();

  if (existingMoments.length === 0) {
    console.log('Database is empty, loading sample data...');

    // Insert all sample moments
    for (const momentData of sampleMomentsData) {
      await createMoment(momentData);
    }

    console.log(`Loaded ${sampleMomentsData.length} sample moments`);
  }
}

/**
 * Clear all moments from the database
 *
 * Useful for testing and development. Removes all moments.
 *
 * @returns Promise<void>
 */
export async function clearAllMoments(): Promise<void> {
  await db.delete(moments);
}
