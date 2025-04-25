// components/ui/Text.tsx
import { cva, cn } from '../../../lib/utils'
import { ReactNode } from 'react'

type TextProps = {
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm'
  color?: 'secondary' | 'black' | 'white'
  className?: string
  children: ReactNode
}

const textVariants = cva('leading-relaxed', {
  variants: {
    size: {
      xxl: 'text-[36px] lg:text-[72px] font-dm-serif ',
      xl: 'text-[32px] lg:text-[56px] font-dm-serif ',
      lg: 'text-2xl lg:text-[36px] font-dm-serif',
      md: 'text-[20px] font-semibold',
      sm: 'text-[16px] leading-[200%]',
    },
    color: {
      secondary: 'text-secondary',
      black: 'text-black',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'black',
  },
})

export default function Text({ size, color, className, children }: TextProps) {
  return <p className={cn(textVariants({ size, color }), className)}>{children}</p>
}
