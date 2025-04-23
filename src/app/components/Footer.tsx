import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className=" text-sm  bg-white text-[#7C8088]">
      {/* Top Contact Info */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-0 py-20 px-4 text-center max-w-5xl container mx-auto">
        <h3 className="text-secondary text-2xl md:text-[40px] font-bold">+420 777 955 235</h3>
        <p className="text-secondary text-2xl md:text-[40px] font-bold">info@zivotopisonline.cz</p>
      </div>

      {/* Middle Grid */}
      <div className="container mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Left side: description + social */}
        <div className="flex flex-col items-center md:items-start">
          <p className="max-w-sm mb-6 leading-[1.8]">
            Služba ŽivotopisOnline.cz vznikla za účelem úspory času, minimalizování chybovosti a
            maximalizování uživatelského komfortu při tvorbě profesionálního životopisu, který občas
            zásadně ovlivňuje životy a budoucnost nás všech.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-9 h-9 border rounded-full flex items-center justify-center text-secondary"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 border rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
          </div>
        </div>

        {/* Middle: info links */}
        <div className="flex flex-col gap-3 text-black">
          <h4 className="font-semibold mb-4 text-black">Informace</h4>
          <Link href="#" className="hover:text-blue-600">
            O nás
          </Link>
          <Link href="#" className="hover:text-blue-600">
            Spolupráce
          </Link>
          <Link href="#" className="hover:text-blue-600">
            Kontakt
          </Link>
          <Link href="#" className="hover:text-blue-600">
            Podmínky užívání služby
          </Link>
        </div>

        {/* Right: contact info */}
        <div className="flex flex-col gap-3 text-black">
          <h4 className="font-semibold mb-4 text-black">Kontakt</h4>
          <p>Michaela Karmazín</p>
          <p>Brno-Ivanovice 302, 621 00 Brno, Česko</p>
          <p>IČO: 88619630</p>
          <p>DIČ: CZ8855184162</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="py-20 px-4 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4 container mx-auto text-center md:text-left">
        <p className="max-w-[400px] leading-[1.8]">
          Životopis vzor © 2024, všechna práva vyhrazena. Je zakázáno jakékoliv kopírování obsahu,
          web je notářsky ověřen!
        </p>
        <div className="flex flex-col items-center md:items-end gap-5 md:gap-2 max-w-[512px]">
          <div className="text-[12px] leading-[1.8]">
            <Link href="#" className="hover:underline text-gray-500">
              Nastavení ochrany soukromí a souborů cookie. Spravováno Googlem. Odpovídá požadavkům
              systému TCF organizace IAB. ID CMP: 300
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <img src="/flags/cz.svg" alt="CZ" className="h-4" />
            <img src="/flags/sk.svg" alt="SK" className="h-4" />
            <img src="/flags/de.svg" alt="DE" className="h-4" />
            <img src="/flags/gb.svg" alt="EN" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  )
}
