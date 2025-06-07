import {SortAndViewControls} from '@/components/shop/products/SortAndViewControls.tsx'
import {ProductGrid} from '@/components/shop/products/ProductGrid.tsx'
import {ProductList} from '@/components/shop/products/ProductList.tsx'
import PaginationControls from '@/components/shop/products/PaginationControls.tsx'
import {FC, useState} from 'react'
import {Product} from '@/types'
import {useSearchParams} from 'react-router-dom'
import {Button} from '@/components/ui/button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

type ItemsViewProps = {
    items: {
        products: Product[]
        totalPages: number
    } | undefined
}

const ItemsView: FC<ItemsViewProps> = ({items}) => {
    const {t} = useTranslation([I18N_NAMESPACES.global])

    const [searchParams, setSearchParams] = useSearchParams()

    const maxPages = items?.totalPages || 1
    const products = items?.products
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    return (
        <div className="min-h-screen bg-background">
            <main className="container px-4 py-6 md:px-6 md:py-8">
                <SortAndViewControls
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
                {viewMode === 'grid' ? (
                    <ProductGrid products={products || []}/>
                ) : (
                    <ProductList products={products || []}/>
                )}

                {maxPages > 1 && (
                    <PaginationControls totalPages={maxPages}/>
                )}

                {searchParams &&
                    <div
                        className={'flex-center-row m-5 w-full'}
                        onClick={() => setSearchParams()}
                    >
                        <Button variant={'outline'}>
                            {t(GLOBAL_LOCALES.clearFilters)}
                        </Button>
                    </div>
                }
            </main>
        </div>
    )
}

export default ItemsView
