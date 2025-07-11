import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(
  request: Request,
  { params }: { params: { cvId: string } }
) {
  try {
    const { sessionId, removeWatermark } = await request.json()
    const { cvId } = params

    // Verify payment first
    if (sessionId && removeWatermark) {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not verified' },
          { status: 403 }
        )
      }
    }

    // Get CV data from your database
    // const cvData = await getCvData(cvId)
    
    // For demo, using mock data
    const cvData = {
      id: cvId,
      name: 'Marketingový specialista',
      // ... other CV data
    }

    // Generate PDF without watermark
    // This is where you'd use your PDF generation logic
    // For now, creating a simple response
    
    const pdfBuffer = await generatePdfFromCvData(cvData, { 
      removeWatermark: removeWatermark 
    })

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cvData.name || 'zivotopis'}.pdf"`,
      },
    })

  } catch (error) {
    console.error('CV generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CV' },
      { status: 500 }
    )
  }
}

// Mock PDF generation function
async function generatePdfFromCvData(cvData: any, options: { removeWatermark?: boolean }) {
  // This is where you'd implement your actual PDF generation
  // For demo purposes, returning a simple buffer
  
  const content = `
    CV: ${cvData.name}
    Generated: ${new Date().toISOString()}
    ${options.removeWatermark ? 'Premium Version - No Watermark' : 'Demo Version'}
  `
  
  return Buffer.from(content, 'utf-8')
}