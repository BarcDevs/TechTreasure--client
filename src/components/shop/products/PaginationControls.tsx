import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import {FC} from 'react'
import {useSearchParams} from 'react-router-dom'

type PaginationControlsProps = {
    totalPages: number
}

export const PaginationControls: FC<PaginationControlsProps> = ({totalPages}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page'))

    const onPageChange = (page: number) => {
        const newPage
            = page < 1 ? 1 :
            page > totalPages ? totalPages :
                page
        setSearchParams(
            {page: newPage.toString()}
        )
    }

    return (
        <div className="mt-8">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious to={`/products?page=${currentPage - 1}`}
                                            onClick={() => onPageChange(currentPage - 1)}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink to={`/products?page=${currentPage === 1 ? 1 : currentPage - 1}`}
                                        isActive={currentPage === 1}
                                        onClick={() => onPageChange(
                                            currentPage === 1 ? 1 : currentPage - 1
                                        )}
                        >
                            {currentPage === 1 ? '1' : currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink to={`/products?page=${currentPage}`}
                                        isActive={currentPage !== 1 && currentPage !== totalPages}>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            to={`/products?page=${currentPage === totalPages ? totalPages : currentPage + 1}`}
                            isActive={currentPage === totalPages}
                            onClick={() => onPageChange(
                                currentPage === totalPages ? totalPages : currentPage + 1
                            )}>
                            {currentPage === totalPages ? totalPages : currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink to={`/products?page=${totalPages}`}
                                        onClick={() => onPageChange(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext to={`/products?page=${currentPage + 1}`}
                                        onClick={() => onPageChange(currentPage + 1)}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
