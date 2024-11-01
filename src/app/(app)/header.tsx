import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/ui/button'
import { PlusSignIcon } from '@/ui/icons/plus-sign'

import { Navigation } from './navigation'
import { ProfilePopover } from './profile-popover'

export const Header = () => {
  return (
    <header className="grid grid-cols-3 items-center border-b border-shape px-5 py-4">
      <Link href={'/'}>
        <Image
          alt="logo"
          src="/images/logo.svg"
          width={56}
          height={40}
          quality={100}
        />
      </Link>

      <Navigation />

      <div className="ml-auto flex items-center gap-4">
        <Button size="sm">
          <PlusSignIcon className="size-5 text-white" />
          Novo produto
        </Button>

        <ProfilePopover />
      </div>
    </header>
  )
}
