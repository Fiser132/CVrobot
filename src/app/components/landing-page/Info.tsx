import Image from 'next/image'

export default function Info() {
  return (
    <section className="py-16 px-4">
      <div className=" mx-auto flex flex-col-reverse xl:flex-row justify-between items-center gap-10 lg:gap-20">
        <div className="flex-1 flex justify-end items-center">
          <div className="max-w-full lg:max-w-[640px] flex flex-col justify-center gap-5 px-4">
            <h2 className="text-4xl lg:text-[56px] font-dm-serif text-secondary mb-4">
              Pomůžeme vám jednoduše vytvořit životopis.
            </h2>
            <p className="text-black text-[16px] leading-[1.8]">
              Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš
              generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML
              vzory životopisu aktuální pro rok 2024, se kterými nejen že vyniknete a Vaše vysněná
              práce Vám bude blíže, ale hlavně, že Vás personální agentury, už jen tak nepřehlédnou!
              Služba Životopis-Online je tu proto, aby Vám pomohla rychle a co nejjednodušeji
              sestavit to nejlepší CV! Pokud náhodou hledáte ZDARMA vzory životopisů, pak jste tu
              rovněž správně.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4 w-max">
          <Image
            src="/cv1normal.png"
            alt="CV Preview 1"
            width={400}
            height={400}
            className="w-1/2 max-w-[150px] lg:max-w-[450px] object-contain"
          />
          <Image
            src="/cv2normal.png"
            alt="CV Preview 2"
            width={400}
            height={400}
            className="w-1/2 max-w-[150px] lg:max-w-[450px] object-contain"
          />
        </div>
      </div>
    </section>
  )
}
