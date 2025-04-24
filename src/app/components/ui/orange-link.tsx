import React from 'react'

type OrangeLinkProps = {
  href: string
  children: React.ReactNode
}

export default function OrangeLink({ href, children }: OrangeLinkProps) {
  return (
    <a href={href} className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
