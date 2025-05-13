import { UserProfile } from '@clerk/nextjs'

const NastaveniPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-black">Nastavení účtu</h1>
      <UserProfile />
    </main>
  )
}

export default NastaveniPage
