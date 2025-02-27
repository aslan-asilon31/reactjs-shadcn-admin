"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox'
import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import React, { useState } from 'react';
import { DataTableRowActions } from './data-table-row-actions'
import LoadingSpinner from '@/components/loading-spinner1.gif';
import axios from 'axios';

// You can use a Zod schema here if you want.
export type Customer = {
  id?: string
  name: string
  balance: number
  is_activated: boolean
}

export const columns : ColumnDef<Customer>[] =  [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'name',
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'balance',
    header: 'balance',
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('balance')}
      </span>
    ),
  },
  {
    accessorKey: 'is_activated',
    header: 'is activated',
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('is_activated') ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
        const customerId = row.original.id;

        const [customers, setCustomers] = useState<Customer[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
    
        const handleDeleteCustomer = async (customerId: string) => {
          alert(customerId)
            try {
                setLoading(true); 
                await axios.delete(`http://localhost:8000/api/customers/${customerId}`);
                setCustomers(customers.filter(customer => customer.id !== customerId));
                alert('berhasil')
            } catch (err) {
                setError('Failed to delete customer'); 
                alert('gagal')
                alert(err)
            } finally {
                setLoading(false); 
            }
        };
        
        const handleEdit = () => {
            window.location.href = `/customers/customerCrud?id=${customerId}`;
        };

        return (
            <div className='flex space-x-2'>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={() => handleDeleteCustomer(customerId)} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        );
    },
  },
];


