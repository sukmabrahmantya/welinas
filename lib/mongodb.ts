import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10,
};

if (!uri) {
  throw new Error(
    "Missing environment variable MONGODB_URI. Please set it in your .env file.",
  );
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

const clientPromise =
  global._mongoClientPromise ?? client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  });

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise;
}

export async function getDb(name = process.env.MONGODB_DB ?? "welinas") {
  const connectedClient = await clientPromise;
  return connectedClient.db(name);
}

export type MongoDb = Awaited<ReturnType<typeof getDb>>;
