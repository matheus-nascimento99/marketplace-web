import { Header } from './header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="m-auto min-h-screen max-w-[1366px]">
      <Header />
      {children}
    </main>
  )
}
