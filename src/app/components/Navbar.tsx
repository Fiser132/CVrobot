'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import PrimaryButton from '../components/ui/primary-button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Desktop + Mobile Logo */}
        <Link href="/" className="flex items-start space-x-2 text-secondary font-bold text-2xl">
          <Image src="/logo.svg" alt="Logo" width={135} height={31} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center text-black space-x-6 text-sm leading-[1.8]">
          <Link href="/urad-prace" className="hover:text-secondary">
            Úrad práce
          </Link>
          <Link
            href="/vzor-zivotopis"
            className="hover:text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            Strukturovaný životopis
          </Link>
          <Link href="/formular-zivotopisu" className="hover:text-secondary">
            Formulář životopisu
          </Link>
          <Link href="/vzor-motivacny" className="hover:text-secondary">
            Vzor motivačního dopisu
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        {!menuOpen && (
          <button
            className="lg:hidden text-black z-50 flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        )}

        {/* Right Action Button (desktop only) */}
        <div className="hidden lg:flex text-right flex-col items-center gap-1">
          <PrimaryButton size="m">VYTVOŘIT ŽIVOTOPIS</PrimaryButton>
          <p className="text-xs text-black">
            nebo <span className="underline">upravit mé CV</span>
          </p>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
          {/* Scrollable area */}
          <div className="overflow-y-auto flex-1 px-4 pt-6 pb-[300px] md:pb-[600px]">
            <div className="flex justify-between items-center mb-4">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image src="/logo.svg" alt="Logo" width={135} height={31} />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-black"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col text-black space-y-8 text-[18px] text-center mt-12 leading-[1.8]">
              <Link href="#" className="hover:text-secondary" onClick={() => setMenuOpen(false)}>
                Úrad práce
              </Link>
              <Link
                href="/vzor-zivotopis"
                className="hover:text-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Strukturovaný životopis
              </Link>
              <Link
                href="/formular-zivotopisu"
                className="hover:text-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Formulář životopisu
              </Link>
              <Link
                href="/vzor-motivacny"
                className="hover:text-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Vzor motivačního dopisu
              </Link>
            </nav>
            {/* CTA */}
            <div className="flex flex-col items-center gap-2 mt-20">
              <PrimaryButton size="m">VYTVOŘIT ŽIVOTOPIS</PrimaryButton>
              <p className="text-[12px] text-black mt-2">
                nebo <span className="underline">upravit mé CV</span>
              </p>
            </div>
          </div>

          {/* Fixed footer image */}
          <div className="fixed bottom-0 left-0 w-full z-50">
            <Image
              src="/mobile-navbar.png"
              alt="Mobile Footer Image"
              width={500}
              height={100}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}
    </header>
  )
}
