import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useMarketplaces } from '../context/marketplaces-context'

export function MarketplacesPrimaryButtons() {
  const { setOpen } = useMarketplaces()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite Marketplace</span> <IconMailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Marketplace</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
