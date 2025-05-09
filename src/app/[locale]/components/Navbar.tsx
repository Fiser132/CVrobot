'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import PrimaryButton from './ui/primary-button'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { isSignedIn, user } = useUser()
const userName =  user?.fullName ?? 'Uživatel'
  const params = useParams()
  const locale = params.locale ?? 'sk'
  const withLocale = (path: string) => `/${locale}${path}`

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={withLocale('/')} className="flex items-start space-x-2 text-secondary font-bold text-2xl">
          <Image src="/logo.svg" alt="Logo" width={135} height={31} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center text-black space-x-6 text-sm leading-[1.8]">
          <Link href={withLocale('/urad-prace')} className="hover:text-secondary">Úrad práce</Link>
          <Link href={withLocale('/vzor-zivotopis')} className="hover:text-secondary">Strukturovaný životopis</Link>
          <Link href={withLocale('/formular-zivotopisu')} className="hover:text-secondary">Formulář životopisu</Link>
          <Link href={withLocale('/motivacne-listy')} className="hover:text-secondary">Vzor motivačního dopisu</Link>
          <Link href={withLocale('/contact-page')} className="hover:text-secondary">Kontakt</Link>
        </nav>

        {/* Desktop User/Profile or CTA */}
        <div className="hidden lg:flex relative">
          {!isSignedIn ? (
            <div className="flex text-right flex-col items-center gap-1">
              <PrimaryButton size="m" >
                <Link href="/sign-up">VYTVOŘIT ŽIVOTOPIS</Link>
              </PrimaryButton>
              <p className="text-xs text-black">
              nebo <SignInButton mode="modal">
    <span className="underline cursor-pointer">upravit mé CV</span>
  </SignInButton>
              </p>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 text-black hover:text-secondary"
              >
                <FontAwesomeIcon icon={faUser} className="p-2.5 rounded-full bg-gray-200" />
                <span className="text-[14px] underline">{userName}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-max bg-white border border-gray-200 text-black shadow-xl px-5 z-50">
                  <Link href={withLocale('/ucet')} className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Moje životopisy</Link>
                  <Link
  href={withLocale('/nastavenia')}
  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
>
  Změna hesla
</Link>
                  <SignOutButton>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Odhlásit se</button>
                  </SignOutButton>
                </div>
              )}
            </div>
          )}
        </div>

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
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
          <div className="overflow-y-auto flex-1 px-4 pt-6 pb-[300px] md:pb-[600px]">
            <div className="flex justify-between items-center mb-4">
              <Link href={withLocale('/')} onClick={() => setMenuOpen(false)}>
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

            <nav className="flex flex-col text-black space-y-8 text-[18px] text-center mt-12 leading-[1.8]">
              <Link href={withLocale('/urad-prace')} onClick={() => setMenuOpen(false)}>Úrad práce</Link>
              <Link href={withLocale('/vzor-zivotopis')} onClick={() => setMenuOpen(false)}>Strukturovaný životopis</Link>
              <Link href={withLocale('/formular-zivotopisu')} onClick={() => setMenuOpen(false)}>Formulář životopisu</Link>
              <Link href={withLocale('/motivacne-listy')} onClick={() => setMenuOpen(false)}>Vzor motivačního dopisu</Link>
              <Link href={withLocale('/contact-page')} onClick={() => setMenuOpen(false)}>Kontakt</Link>
            </nav>

            {isSignedIn ? (
              <div className="flex flex-col items-center gap-2 mt-20">
                <div className="text-black text-center">
                  <FontAwesomeIcon icon={faUser} className="text-lg mb-1" />
                  <p className="text-sm font-semibold">{userName}</p>
                </div>
                <div className="mt-4 text-sm text-black text-center space-y-2">
                  <Link href={withLocale('/profil')} onClick={() => setMenuOpen(false)} className="block">Můj profil</Link>
                  <Link href={withLocale('/nastaveni')} onClick={() => setMenuOpen(false)} className="block">Nastavení</Link>
                  <SignOutButton>
                    <button className="block w-full" onClick={() => setMenuOpen(false)}>Odhlásit se</button>
                  </SignOutButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-20">
                <PrimaryButton >
                  <Link href="/sign-up">VYTVOŘIT ŽIVOTOPIS</Link>
                </PrimaryButton>
                <Link className="underline text-black text-sm" href="/sign-in">Přihlásit se</Link>
              </div>
            )}
          </div>

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
