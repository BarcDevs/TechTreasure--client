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
import PageLink from '@/components/shop/products/PageLink.tsx'

type PaginationControlsProps = {
    totalPages: number
}

export const PaginationControls: FC<PaginationControlsProps> = ({totalPages}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page'))

    const setPage = (page: number) => {
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
                                            onClick={() => setPage(currentPage - 1)}
                        />
                    </PaginationItem>
                    <PageLink
                        currentPage={currentPage}
                        setPage={setPage}
                        linkLocation={1}
                        totalPages={totalPages}
                    />
                    <PageLink
                        currentPage={currentPage}
                        setPage={setPage}
                        linkLocation={2}
                        totalPages={totalPages}
                    />
                    <PageLink
                        currentPage={currentPage}
                        setPage={setPage}
                        linkLocation={3}
                        totalPages={totalPages}
                    />
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink to={`/products?page=${totalPages}`}
                                        onClick={() => setPage(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext to={`/products?page=${currentPage + 1}`}
                                        onClick={() => setPage(currentPage + 1)}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
