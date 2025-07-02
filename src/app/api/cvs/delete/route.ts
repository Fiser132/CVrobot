import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // FIXED: Read ID from URL query parameters instead of request body
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('pages')

    const result = await db.collection('cvs').deleteOne({
      _id: new ObjectId(id),
      userId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'CV not found or unauthorized' }, { status: 404 })
    }

    return NextResponse.json({ success: true, deleted: result.deletedCount })

  } catch (error) {
    console.error('Delete CV error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}