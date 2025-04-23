'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function FAQ() {
  const questions = [
    {
      question: 'Je CVrobot zdarma?',
      answer:
        'Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML vzory životopisu aktuální pro rok 2024.',
    },
    {
      question: 'Proč bych měl použít CVrobot?',
      answer:
        'Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML vzory životopisu aktuální pro rok 2024.',
    },
    {
      question: 'Mám vytvořený životopis a potřebuji ho aktualizovat. Jak to?',
      answer:
        'Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML vzory životopisu aktuální pro rok 2024.',
    },
    {
      question: 'Potřebuji CV v PDF formátu. Jak to udělám?',
      answer:
        'Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML vzory životopisu aktuální pro rok 2024.',
    },
    {
      question: 'Jak vás mohu doporučit?',
      answer:
        'Přes náš formulář odešlete svá data ke zpracování online a to již během pár minut. Náš generátor zpracuje všechny vyplněné údaje a vytvoří Vám ihned profesionální PDF a HTML vzory životopisu aktuální pro rok 2024.',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 xl:px-52">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-dm-serif text-secondary lg:w-[800px]">
          Často vás zajímá
        </h2>
        <ul className="space-y-4 w-full">
          {questions.map((item, i) => (
            <li key={i} className=" cursor-pointer transition" onClick={() => toggle(i)}>
              <div className="">
                <div className="flex justify-between items-center bg-[#F7F7F7] p-4 rounded-xl">
                  <span
                    className={`font-semibold text-[16px] ${
                      openIndex === i ? 'text-primary' : 'text-black'
                    }`}
                  >
                    {item.question}
                  </span>
                  <FontAwesomeIcon
                    icon={openIndex === i ? faMinus : faPlus}
                    className="text-primary h-5"
                  />
                </div>

                {openIndex === i && (
                  <div className="mt-3 bg-white rounded-md leading-[1.8] p-4 text-black transition duration-300 ease-in-out">
                    {item.answer}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
