import { MongoClient, MongoClientOptions } from "mongodb";

const options: MongoClientOptions = {
  maxPoolSize: 10,
};

let clientPromise: Promise<MongoClient> | null = null;

async function getClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Missing environment variable MONGODB_URI. Please set it in your env.",
    );
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      `Invalid MONGODB_URI scheme. Expected it to start with "mongodb://" or "mongodb+srv://", received "${uri}".`,
    );
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      console.error("Failed to connect to MongoDB", error);
      throw error;
    });

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-extra-semi
      (global as any)._mongoClientPromise = clientPromise;
    }
  }

  return clientPromise;
}

export async function getDb(name = process.env.MONGODB_DB ?? "welinas") {
  const client = await getClient();
  return client.db(name);
}

export type MongoDb = Awaited<ReturnType<typeof getDb>>;
