import Text from '../components/ui/text'
import PrimaryButton from '../components/ui/primary-button'
import FinalCTA from '../components/landing-page/FinalCTA'

const ContactPage = () => {
  return (
    <main className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg mb-32 p-8 md:p-12">
        <Text color="secondary" size="xl" className="mb-4 text-center">
          Kontakt
        </Text>
        <p className="text-gray-700 text-center mb-2">
          Ak máte akýkoľvek dotaz, alebo návrh na zlepšenie, neváhajte sa nám ozvať cez nasledujúci
          kontaktný formulár.
        </p>
        <p className="text-gray-700 text-center mb-10">
          Rovnako oceníme, ak narazíte na nejakú chybu, ak nám to nahlásite. Ďakujeme. Našim cieľom
          je poskytovať Vám tie najkvalitnejšie služby.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
              Meno:
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              placeholder="Vaše meno"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              placeholder="vas@email.sk"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
              Váš dotaz:
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              placeholder="Napíšte nám správu..."
            ></textarea>
          </div>
          <div className="w-full flex items-center justify-center">
            <PrimaryButton size="xl">Odoslať</PrimaryButton>
          </div>
        </form>
      </div>
      <FinalCTA />
    </main>
  )
}

export default ContactPage
