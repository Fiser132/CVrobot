import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {}



// Attach property directly to globalThis (correct way)
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> }

const client = new MongoClient(uri, options)

const clientPromise =
  globalForMongo._mongoClientPromise ?? (globalForMongo._mongoClientPromise = client.connect())

export default clientPromise
