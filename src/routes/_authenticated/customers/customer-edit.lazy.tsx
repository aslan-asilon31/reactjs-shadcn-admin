import CustomerEdit from '@/features/customers/customer-edit'
import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/_authenticated/customers/customer-edit')({
  component: CustomerEdit,
})
