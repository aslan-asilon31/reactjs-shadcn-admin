import CustomerCrud from '@/features/customers/customer-crud'
import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/_authenticated/customers/customer-create')({
  component: CustomerCrud,
})
