import {Button} from '@/components/ui/button.tsx'
import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'
import {FC} from 'react'
import {Column} from '@tanstack/react-table'
import {Product} from '@/types'

type ColumnHeaderProps = {
    column: Column<Product, unknown>
    name: string
}

const ColumnSort: FC<ColumnHeaderProps> = ({column, name}) => {
    return (
        <div className="hidden md:block">
            <Button
                variant="ghost"
                className="w-full justify-start p-0 font-medium"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                {name}
                {
                    column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="ml-2 size-4"/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="ml-2 size-4"/>
                    ) : (
                        <ArrowUpDown className="ml-2 size-4"/>
                    )}
            </Button>
        </div>

    )
}

export default ColumnSort
