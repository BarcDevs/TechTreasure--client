import {PaginationItem, PaginationLink} from '@/components/ui/pagination'
import {FC} from 'react'

type PageLinkProps = {
    currentPage: number
    setPage: (page: number) => void
    page: number
}

const PageLink: FC<PageLinkProps> = ({currentPage, setPage, page}) => {
    const isActive = currentPage === page

    return (
        <PaginationItem>
            <PaginationLink
                to="#"
                isActive={isActive}
                onClick={() => !isActive && setPage(page)}
                className={isActive
                    ? 'pointer-events-none opacity-60'
                    : 'cursor-pointer'}
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    )
}

export default PageLink
