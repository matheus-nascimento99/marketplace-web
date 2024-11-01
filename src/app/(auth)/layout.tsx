import Image from 'next/image'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="m-auto grid min-h-screen max-w-[1366px] grid-cols-2">
      <section className="space-y-14">
        <div className="ml-10 mt-10 flex items-center gap-5">
          <Image
            alt="logo"
            src="/images/logo.svg"
            className="w-23"
            width={100}
            height={100}
            quality={100}
          />

          <div className="mt-1 space-y-1">
            <h1 className="font-dm-sans text-title-md text-gray-500">
              Marketplace
            </h1>
            <h2 className="text-body-md leading-relaxed text-gray-400">
              Painel de Vendedor
            </h2>
          </div>
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
