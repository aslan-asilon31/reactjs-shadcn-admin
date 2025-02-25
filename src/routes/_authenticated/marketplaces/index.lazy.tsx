import { createLazyFileRoute } from '@tanstack/react-router'
import Marketplaces from '@/features/marketplaces'

export const Route = createLazyFileRoute('/_authenticated/marketplaces/')({
  component: Marketplaces,
})
