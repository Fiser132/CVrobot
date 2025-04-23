export default function FinalCTA() {
  return (
<section className="relative px-4 min-h-[440px] md:min-h-[600px] flex justify-center items-center bg-gradient-to-br from-blue-700 to-purple-500 text-white text-center">

  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    <img
      src="/Vector1.png"
      alt="Decorative background"
      className="absolute bottom-10 right-10 blur-2xl opacity-20"
    />
    <img
      src="/Vector2.png"
      alt="Decorative background"
      className="absolute blur-2xl -top-20 left-20 opacity-20"
    />
    <img
      src="/Vector3.png"
      alt="Decorative background"
      className="absolute blur-2xl left-30 -bottom-10 h-[600px] opacity-20"
    />
  </div>


  <img
    src="/shakinghands.png"
    alt="Shaking hands"
    className="absolute left-1/2 -translate-x-1/2 -top-30 sm:-top-60 h-[250px] lg:h-[510px] md:left-[400px] z-30"
  />


  <div className="flex flex-col gap-10 sm:gap-16 items-center max-w-4xl z-30">
    <h2 className="text-[36px] lg:text-[72px] font-dm-serif leading-snug max-w-4xl">
      Napsat životopis s CVrobot nebylo jednodušší.
    </h2>
    <button className="bg-primary py-6 px-8 text-white md:w-max rounded font-semibold text-sm sm:text-base">
      CHCI VYTVOŘIT ŽIVOTOPIS
    </button>
  </div>
</section>

  )
}
