"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop + Mobile Logo */}
        <Link href="/" className="flex items-center space-x-2 text-blue-600 font-bold text-2xl">
          <Image src="/logo.svg" alt="Logo" width={135} height={31} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center text-black space-x-6 text-sm font-medium">
          <Link href="#" className="hover:text-blue-600">O nás</Link>
          <Link href="#" className="hover:text-blue-600">Strukturovaný životopis</Link>
          <Link href="#" className="hover:text-blue-600">Formulář životopisu</Link>
          <Link href="#" className="hover:text-blue-600">Vzor motivačního dopisu</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        {!menuOpen && (
          <button
            className="md:hidden text-black z-50 flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        )}

        {/* Right Action Button (desktop only) */}
        <div className="hidden md:flex text-right flex-col items-center gap-1">
          <button className="bg-primary h-[48px] px-8 text-white rounded font-semibold text-sm">
            Vytvořit životopis
          </button>
          <p className="text-xs text-black">nebo <span className="underline">upravit mé CV</span></p>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-6 gap-8">
          <div className="px-4 h-full flex flex-col gap-5">
            {/* Mobile logo and close button */}
            <div className="flex justify-between items-center">
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

            {/* Navigation links */}
            <nav className="flex flex-col text-black space-y-8 text-[18px] text-center mt-12">
              <Link href="#" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>O nás</Link>
              <Link href="#" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Strukturovaný životopis</Link>
              <Link href="#" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Formulář životopisu</Link>
              <Link href="#" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Vzor motivačního dopisu</Link>
            </nav>

            {/* CTA button */}
            <div className="flex flex-col items-center gap-2 mt-20">
              <button className="bg-primary w-full h-[48px] px-6 text-white rounded font-semibold">
                Vytvořit životopis
              </button>
              <p className="text-sm text-black mt-2">nebo <span className="underline">upravit mé CV</span></p>
            </div>
          </div>

          {/* Optional mobile footer image */}
          <Image src="/mobile-navbar.png" alt="Mobile Footer Image" width={150} height={40} className="w-full" />
        </div>
      )}
    </header>
  )
}
