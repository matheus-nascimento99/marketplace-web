'use client'

import { QueryClientProvider as QueryProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { queryClient } from '@/lib/tanstack-query/query-client'

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>
}
