import './globals.css'

import type { Metadata } from 'next'
import { DM_Sans as DMSans, Poppins } from 'next/font/google'

export const headingFont = DMSans({
  weight: '700',
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const bodyFont = Poppins({
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { template: '%s | Marketplace', default: 'Marketplace' },
  description: 'Sistema para gestão de produtos de venda em marketplace',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
