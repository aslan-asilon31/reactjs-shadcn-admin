import { useMarketplaces } from '../context/marketplaces-context'
import { MarketplacesActionDialog } from './marketplaces-action-dialog'
import { MarketplacesDeleteDialog } from './marketplaces-delete-dialog'
import { MarketplacesInviteDialog } from './marketplaces-invite-dialog'

export function MarketplacesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useMarketplaces()
  return (
    <>
      <MarketplacesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <MarketplacesInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <MarketplacesActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <MarketplacesDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
