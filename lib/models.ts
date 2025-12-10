import { Collection, Document, ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

export type UserDocument = {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  bio?: string;
  avatarUrl?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type FavoriteWordDocument = {
  _id: ObjectId;
  userId: ObjectId;
  word: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

async function getCollection<T extends Document>(
  name: "users" | "favoriteWords",
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

export async function getUsersCollection() {
  const collection = await getCollection<UserDocument>("users");
  await collection.createIndex({ email: 1 }, { unique: true });
  return collection;
}

export async function getFavoriteWordsCollection() {
  const collection = await getCollection<FavoriteWordDocument>(
    "favoriteWords",
  );
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ userId: 1, word: 1 }, { unique: true });
  return collection;
}
