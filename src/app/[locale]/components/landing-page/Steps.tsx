export default function Steps() {
  const steps = [
    {
      number: '1.',
      title: 'Vyberete šablonu',
      desc: 'Máme pro vás připraveno 15 elegantních šablon.',
      icon: '/cv-done.png',
    },
    {
      number: '2.',
      title: 'Vyplníte údaje',
      desc: 'Vaše osobní údaje, dovednosti a pracovní zkušenosti.',
      icon: '/paper-pen.png',
    },
    {
      number: '3.',
      title: 'Hotovo!',
      desc: 'Stáhněte si hotový životopis v PDF nebo HTML formátu.',
      icon: '/window-brush.png',
    },
  ]

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4 flex flex-col xl:flex-row w-full justify-around">
        {steps.map((step, i) => (
          <div key={i} className="relative flex items-center justify-center gap-2 md:gap-0 w-full">
            <div className="relative w-[200px]">
              <div className="text-[160px] md:text-[200px] font-dm-serif text-gray-100  leading-none">
                {step.number}
              </div>
              <img
                src={step.icon}
                alt=""
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-3 absolute md:top-14 md:left-15 top-12 left-12"
              />
            </div>
            <div className="flex flex-col max-w-[240px] w-full gap-3">
              <h3 className="text-[24px] md:text-[28px] text-secondary font-dm-serif">
                {step.title}
              </h3>
              <p className="text-sm md:text-[15px] text-secondary leading-[1.8]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
