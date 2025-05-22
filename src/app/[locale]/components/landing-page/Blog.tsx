import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Text from '../ui/text'

export default function Blog() {
  const articles = [
    {
      title: 'Příklady životopisů, které můžete použít na pohovor',
      image: '/man.png',
    },
    {
      title: 'Jak sehnat zajímavou práci, o které sníte?',
      image: '/man-pc.png',
    },
    {
      title: 'Co chtějí vlastně dělat za práci? Někdy je to dilema.',
      image: '/man-electric.png',
    },
    {
      title: 'O jaký plat si mohu říci u pohovoru a jak?',
      image: '/man-smile.png',
    },
  ]

  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-4 grid xl:grid-cols-2 gap-8 md:gap-14">
        {articles.map((article, i) => (
          <div
            key={i}
            className="flex gap-6 md:gap-10 max-h-[90px] md:max-h-[180px] items-start w-full md:w-[610px]"
          >
            <img
              src={article.image}
              alt={article.title}
              className="rounded h-full w-[120px] md:h-[174px] md:w-[250px]"
            />
            <div className="flex flex-col  justify-between md:justify-center gap-0 lg:gap-5 h-full">
              <Text size="md" className="text-[14px] md:text-[20px]">
                {article.title}
              </Text>
              <Link
                href="#"
                className="text-primary text-[13px] md:text-[15px] font-semibold flex leading-[1.8]  items-center gap-3 underline"
              >
                Přečíst si <FontAwesomeIcon icon={faArrowRightLong} className="h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
