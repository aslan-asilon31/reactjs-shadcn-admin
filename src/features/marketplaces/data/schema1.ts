import { z } from 'zod'

const marketplaceStatusSchema1 = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type MarketplaceStatus1 = z.infer<typeof marketplaceStatusSchema1>

const marketplaceSchema1 = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Marketplace = z.infer<typeof marketplaceSchema1>

export const marketplaceListSchema1 = z.array(marketplaceSchema1)
