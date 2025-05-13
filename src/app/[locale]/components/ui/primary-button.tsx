import React from 'react'
import { cn } from '@/lib/utils'

type ButtonSize = 'm' | 'xl' | 'xxl'

type PrimaryButtonProps = {
  children: React.ReactNode
  size?: ButtonSize
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const sizeClasses: Record<ButtonSize, string> = {
  m: 'h-[48px] px-10 w-[215px] text-[13px]',
  xl: 'h-[64px] px-10 text-[14px]',
  xxl: 'h-[72px] px-8 text-[16px]',
}

export default function PrimaryButton({
  children,
  size = 'm',
  className,
  onClick,
  type = 'button',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'bg-primary text-white rounded font-semibold md:w-max uppercase',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  )
}
