'use client'

import * as Avatar from '@radix-ui/react-avatar'
import * as Popover from '@radix-ui/react-popover'
import * as Separator from '@radix-ui/react-separator'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import { Logout01Icon } from '@/ui/icons/logout-01'

import { signOutAction } from './actions/sign-out'
export const ProfilePopover = () => {
  const handleLogout = async () => {
    const result = await signOutAction()

    if (result.message) {
      toast.error(result.message)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar.Root className="block size-12 overflow-hidden rounded-2xl ring-1 ring-shape">
          <Avatar.Image
            className="size-12"
            src="https://github.com/matheus-nascimento99.png"
            alt="Profile avatar"
          />
          <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-transparent font-dm-sans text-title-sm text-gray-300">
            MN
          </Avatar.Fallback>
        </Avatar.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="w-42 animate-slide gap-5 rounded-2xl bg-white p-4"
          sideOffset={12}
        >
          <div className="flex items-center gap-3">
            <Avatar.Root className="block size-8 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-shape">
              <Avatar.Image
                className="size-8"
                src="https://github.com/matheus-nascimento99.png"
                alt="Profile avatar"
              />

              <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-transparent font-dm-sans text-title-sm text-gray-300">
                MN
              </Avatar.Fallback>
            </Avatar.Root>

            <span className="align-middle text-body-sm text-gray-300">
              Matheus Nascimento
            </span>
          </div>

          <Separator.Root
            className="my-5 h-0.25 bg-shape"
            orientation="horizontal"
          />

          <Button
            variant="link"
            size="inset"
            font="action-sm"
            type="button"
            className="w-full"
            onClick={handleLogout}
          >
            Sair
            <Logout01Icon className="ml-auto size-5 text-orange-base" />
          </Button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
