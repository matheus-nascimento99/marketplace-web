import Image from 'next/image'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="m-auto grid min-h-screen max-w-[1366px] grid-cols-2">
      <section className="space-y-14">
        <div className="ml-10 mt-10">
          <Image
            alt="logo"
            src="/images/logo.svg"
            className="h-16 w-64"
            width={300}
            height={70}
            quality={100}
          />
        </div>

        <div>
          <Image
            alt="logo"
            src="/images/background.svg"
            width={755}
            height={496}
            quality={100}
          />
        </div>
      </section>
      <section className="flex items-start justify-center p-6">
        {children}
      </section>
    </main>
  )
}
