import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function DELETE(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

  const client = await clientPromise
  const db = client.db('pages')

  const result = await db.collection('cvs').deleteOne({
    _id: new ObjectId(id),
    userId,
  })

  return NextResponse.json({ success: true, deleted: result.deletedCount })
}
