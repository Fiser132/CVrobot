import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="flex w-full flex-col-reverse lg:flex-row h-auto gap-5 md:gap-0 lg:h-[700px] items-center">
        {/* Text Section */}
        <div className="w-full lg:w-[1500px] lg:pl-44 z-10 flex flex-col text-center gap-0 md:gap-8 lg:text-left px-4">
          <div>
          <h1 className="text-[36px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-black font-dm-serif mb-4 leading-[1.1] max-w-2xl mx-auto lg:mx-0">
            Napište si životopis do 5 minut. <span className="text-secondary">Zdarma.</span>
          </h1>
          <p className="text-base md:text-lg mb-6 text-black max-w-xl mx-auto lg:mx-0 leading-[1.8]">
            Profesionální a elegantní životopis s našimi moderními šablonami. Už jen krok vás dělí od vaší vysněné práce.
          </p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <button className="bg-primary py-4 px-6 sm:py-5 sm:px-8 text-white rounded font-semibold text-sm">
              Chci životopis
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[320px] sm:h-[500px] md:h-[550px] lg:h-[700px] flex items-center justify-center lg:justify-end">
          {/* Show on large screens only */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/hero.png"
              alt="Hero desktop"
              fill
              className="z-20"
            />
          </div>

          {/* Show on small screens only */}
          <div className="block lg:hidden absolute  inset-0">
            <Image
              src="/hero-mobile.png"
              alt="Hero mobile"
              fill
              className="z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
