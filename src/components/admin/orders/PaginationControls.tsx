import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {FC} from 'react'

type PaginationControlsProps = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

const PaginationControls: FC<PaginationControlsProps> =

    ({totalItems, itemsPerPage, currentPage}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                </span> of{' '}
                <span className="font-medium">{totalItems}</span> orders
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronLeft className="size-4"/>
                    <span className="sr-only">
                        Previous Page
                    </span>
                </Button>

                {Array.from({length: Math.min(5, totalPages)}, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant="outline"
                        size="sm"
                        className="size-8 p-0"
                        disabled={page === currentPage}
                    >
                        {page}
                    </Button>
                ))}

                <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
                    <ChevronRight className="size-4"/>
                    <span className="sr-only">Next Page</span>
                </Button>
            </div>
        </div>
    )
}

export default PaginationControls
