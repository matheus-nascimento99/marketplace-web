'use client'

import * as Avatar from '@radix-ui/react-avatar'
import * as Popover from '@radix-ui/react-popover'
import * as Separator from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import { Logout01Icon } from '@/ui/icons/logout-01'
import { Skeleton } from '@/ui/skeleton'
import { getNameInitials } from '@/utils/get-name-initials'

import { signOutAction } from './actions/sign-out'
import { getProfile } from './requests/get-profile'
export const ProfilePopover = () => {
  const { data: profile, error } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
  })

  if (error) toast.error(error.message)

  const handleLogout = async () => {
    const result = await signOutAction()

    if (result.message) {
      toast.error(result.message)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        {profile ? (
          <Avatar.Root className="block size-12 overflow-hidden rounded-2xl ring-1 ring-shape">
            {profile?.seller.avatar && (
              <Avatar.Image
                className="size-12 object-contain"
                src={profile.seller.avatar.url}
                alt="Profile avatar"
              />
            )}
            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-transparent font-dm-sans text-title-sm text-gray-300">
              {profile ? getNameInitials(profile.seller.name) : ''}
            </Avatar.Fallback>
          </Avatar.Root>
        ) : (
          <Skeleton className="block size-12 rounded-2xl" />
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="w-48 animate-slide gap-5 rounded-2xl bg-white p-4"
          sideOffset={12}
        >
          <div className="flex items-center gap-3">
            {profile ? (
              <Avatar.Root className="block size-8 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-shape">
                {profile?.seller.avatar && (
                  <Avatar.Image
                    className="size-8 object-contain"
                    src={profile.seller.avatar.url}
                    alt="Profile avatar"
                  />
                )}

                <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-transparent font-dm-sans text-title-sm text-gray-300">
                  {profile ? getNameInitials(profile.seller.name) : ''}
                </Avatar.Fallback>
              </Avatar.Root>
            ) : (
              <Skeleton className="block size-8 flex-shrink-0 rounded-lg" />
            )}

            {profile ? (
              <span className="line-clamp-2 align-middle text-body-sm text-gray-300">
                {profile?.seller.name}
              </span>
            ) : (
              <Skeleton className="h-8 rounded-lg" />
            )}
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
