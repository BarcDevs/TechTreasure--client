import {Button} from '@/components/ui/button'
import {FC} from 'react'
import {Table} from '@tanstack/react-table'

type PaginationControlsProps = {
    table: Table<any>
}

const ProductPaginationControls: FC<PaginationControlsProps> = ({table}) => (
    <div className="flex w-full px-4 py-2">
        <div className="ml-auto flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>
)

export default ProductPaginationControls
