'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Text from '../ui/text'
import { cn } from '@/lib/utils'

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
    <section className="py-20 px-4 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <Text size="xl" color="secondary" className="lg:w-[800px]">
          Často vás zajímá
        </Text>
        <ul className="space-y-3 w-full">
          {questions.map((item, i) => (
            <li key={i} className="cursor-pointer transition" onClick={() => toggle(i)}>
              <div>
                <div className="flex justify-between items-center bg-[#F7F7F7] py-3 lg:py-2 px-4 rounded-xl">
                  <Text
                    className={cn('font-semibold', openIndex === i ? 'text-primary' : 'text-black')}
                  >
                    {item.question}
                  </Text>

                  <FontAwesomeIcon
                    icon={openIndex === i ? faMinus : faPlus}
                    className="text-primary h-5"
                  />
                </div>

                {openIndex === i && (
                  <Text className="p-4 transition duration-300 ease-in-out">{item.answer}</Text>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
