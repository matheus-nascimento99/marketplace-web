import { redirect, RedirectType } from 'next/navigation'

import { isAuthenticated } from '@/auth/is-authenticated'
import { QueryClientProvider } from '@/contexts/query-client-provider'

import { Header } from './header'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAuthenticated()

  if (!isAuth) {
    redirect('/sign-in', RedirectType.replace)
  }

  return (
    <main className="m-auto min-h-screen max-w-[1366px]">
      <QueryClientProvider>
        <Header />
        {children}
      </QueryClientProvider>
    </main>
  )
}
