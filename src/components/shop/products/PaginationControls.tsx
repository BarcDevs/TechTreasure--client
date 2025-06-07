import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

import {FC} from 'react'
import {useSearchParams} from 'react-router-dom'
import PageLink from '@/components/shop/products/PageLink'

type PaginationControlsProps = {
    totalPages: number
}

const PaginationControls: FC<PaginationControlsProps> = ({totalPages}) => {
    const [searchParams, setParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const setPage = (page: number) => {
        const clampedPage = Math.max(1, Math.min(page, totalPages))
        const updatedParams = new URLSearchParams(searchParams)
        updatedParams.set('page', clampedPage.toString())
        setParams(updatedParams)
    }

    const getVisiblePages = (): number[] => {
        if (totalPages === 2) return [1, 2]

        if (currentPage === 1) return [1, 2, 3]
        if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages]

        return [currentPage - 1, currentPage, currentPage + 1]
    }

    const visiblePages = getVisiblePages().filter(
        (page) => page >= 1 && page <= totalPages
    )

    return (
        <div className="mt-8">
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                to="#"
                                onClick={() => setPage(currentPage - 1)}
                                className="cursor-pointer"
                            />
                        </PaginationItem>
                    )}

                    {visiblePages.map((page) => (
                        <PageLink
                            key={page}
                            currentPage={currentPage}
                            setPage={setPage}
                            page={page}
                        />
                    ))}

                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                to="#"
                                onClick={() => setPage(currentPage + 1)}
                                className="cursor-pointer"
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationControls
