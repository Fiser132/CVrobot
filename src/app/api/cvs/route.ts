import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const client = await clientPromise
  const db = client.db('pages')

  const cvs = await db.collection('cvs').find({ userId }).sort({ date: -1 }).toArray()

  return NextResponse.json(cvs)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, content } = body

  if (!name) {
    return NextResponse.json({ error: 'Missing CV name' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db('pages')

  const result = await db.collection('cvs').insertOne({
    userId,
    name,
    content: content || {},
    date: new Date(),
  })

  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 })
}
