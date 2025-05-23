import Image from 'next/image'
import PrimaryButton from '../ui/primary-button'
import Text from '../ui/text'

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="flex w-full flex-col-reverse lg:flex-row h-auto gap-5 md:gap-0 lg:h-[700px] items-center">
        {/* Text Section */}
        <div className="w-full lg:w-[1500px] lg:pl-44 z-10 flex flex-col text-center gap-0 md:gap-8 lg:text-left px-4">
          <div>
            <Text size="xxl">
              Napište si životopis do 5 minut. <span className="text-secondary">Zdarma.</span>
            </Text>
            <p className="text-base md:text-lg mb-6 text-black max-w-xl mx-auto lg:mx-0 leading-[1.8]">
              Profesionální a elegantní životopis s našimi moderními šablonami. Už jen krok vás dělí
              od vaší vysněné práce.
            </p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <PrimaryButton size="xl">Chci životopis</PrimaryButton>
          </div>
        </div>

        <div className="relative w-full h-[320px] sm:h-[500px] md:h-[550px] lg:h-[700px] flex items-center justify-center lg:justify-end overflow-hidden">
          {/* Background container with 70% width */}
          <div className="absolute hidden lg:block xl:hidden right-0 top-0 h-full w-[80%] bg-gradient-to-r from-secondary via-blue-650 to-secondary z-10" />

          {/* Desktop image */}
          <div className="hidden lg:block absolute inset-0 z-20">
            <Image src="/hero.png" alt="Hero desktop" fill className="object-contain" />
          </div>

          {/* Mobile image */}
          <div className="block lg:hidden absolute inset-0 z-20">
            <Image src="/hero-mobile.png" alt="Hero mobile" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
