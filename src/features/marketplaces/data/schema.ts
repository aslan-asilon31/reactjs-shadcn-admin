import { z } from 'zod'

const marketplaceStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type MarketplaceStatus = z.infer<typeof marketplaceStatusSchema>

const marketplaceRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const marketplaceSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: marketplaceStatusSchema,
  role: marketplaceRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Marketplace = z.infer<typeof marketplaceSchema>

export const marketplaceListSchema = z.array(marketplaceSchema)
