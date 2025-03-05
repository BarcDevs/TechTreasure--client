import {PaginationItem, PaginationLink} from '@/components/ui/pagination.tsx'
import {FC} from 'react'

type PageLinkProps = {
    currentPage: number,
    setPage: (page: number) => void,
    linkLocation: number,
    totalPages: number
}
const PageLink: FC<PageLinkProps> = ({currentPage, setPage, linkLocation, totalPages}) => {
    const page =
        linkLocation === 1 ? Math.min(Math.max(currentPage - 1, 1), totalPages - 2)
            : linkLocation === 2 ? Math.min(Math.max(currentPage, 2), totalPages - 1)
                : Math.min(Math.max(currentPage + 1, 3), totalPages)

    return (
        <PaginationItem>
            <PaginationLink to={`/products?page=${page}`}
                            isActive={currentPage === page}
                            onClick={() => setPage(page)}
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    )
}

export default PageLink
