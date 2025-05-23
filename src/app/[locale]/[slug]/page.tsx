// app/[locale]/[slug]/page.tsx

import { notFound } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import ReactMarkdown from 'react-markdown'
import Text from '../components/ui/text'
import OrangeLink from '../components/ui/orange-link'
import FinalCTA from '../components/landing-page/FinalCTA'
import Table from '../components/ui/Table'

type PageProps = {
  params: Promise<{
    slug: string
    locale: string
  }>
}

// ✅ async default export that handles Promise<params>
export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params // ✅ unwrapping the Promise

  const client = await clientPromise
  const db = client.db('pages')

  const page = await db.collection('content').findOne({
    url: `/${slug}`,
    language: locale,
  })

  if (!page || typeof page.body !== 'string') {
    notFound()
  }

  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 flex flex-col gap-5 max-w-5xl mx-auto leading-relaxed prose prose-lg">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Text size="xl" color="secondary" className="font-dm-serif mt-4">
                {children}
              </Text>
            ),
            h2: ({ children }) => (
              <Text size="lg" color="secondary" className="mb-2 mt-5">
                {children}
              </Text>
            ),
            h3: ({ children }) => (
              <Text size="md" className="mt-10">
                {children}
              </Text>
            ),
            p: ({ children }) => <Text>{children}</Text>,
            a: ({ children, href }) => (
              <OrangeLink href={href ?? '#'}>{children}</OrangeLink>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
                {children}
              </ul>
            ),
            li: ({ children }) => <li>{children}</li>,
            h4: () => <Table />,
          }}
        >
          {page.body}
        </ReactMarkdown>
      </main>
      <FinalCTA />
    </div>
  )
}

export async function generateStaticParams() {
  const client = await clientPromise
  const db = client.db('pages')
  const pages = await db.collection('content').find({}).toArray()

  return pages.map((page) => ({
    locale: page.language,
    slug: page.url.replace('/', ''),
  }))
}
