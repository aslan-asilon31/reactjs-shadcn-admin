import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Marketplace } from '../data/schema'

type MarketplacesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface MarketplacesContextType {
  open: MarketplacesDialogType | null
  setOpen: (str: MarketplacesDialogType | null) => void
  currentRow: Marketplace | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Marketplace | null>>
}

const MarketplacesContext = React.createContext<MarketplacesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function MarketplacesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<MarketplacesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Marketplace | null>(null)

  return (
    <MarketplacesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MarketplacesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMarketplaces = () => {
  const marketplacesContext = React.useContext(MarketplacesContext)

  if (!marketplacesContext) {
    throw new Error('useMarketplaces has to be used within <MarketplacesContext>')
  }

  return marketplacesContext
}
