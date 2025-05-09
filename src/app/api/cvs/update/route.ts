import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PUT(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, content } = await req.json()
  if (!id || typeof content !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db('pages')

  const result = await db.collection('cvs').updateOne(
    { _id: new ObjectId(id), userId },
    { $set: { content, date: new Date() } }
  )

  return NextResponse.json({ success: true, updated: result.modifiedCount })
}
