import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  // unwrap the params promise
  const { id } = await context.params

  try {
    const client = await clientPromise
    const db = client.db('pages')

    // Validate the ID format
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
    }

    // Try to find the CV document
    const cv = await db.collection('cvs').findOne({ _id: objectId })

    if (!cv) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 })
    }

    // Return only the fields you need
    return NextResponse.json(
      {
        name: cv.name || '',
        content: cv.content || {},
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
