import {SortAndViewControls} from '@/components/shop/products/SortAndViewControls.tsx'
import {ProductGrid} from '@/components/shop/products/ProductGrid.tsx'
import {ProductList} from '@/components/shop/products/ProductList.tsx'
import {PaginationControls} from '@/components/shop/products/PaginationControls.tsx'
import {FC, useState} from 'react'
import {Product} from '@/types'

type ItemsViewProps = {
    items: {
        products: Product[];
        totalPages: number;
    } | undefined
}

const ItemsView: FC<ItemsViewProps> = ({items}) => {
    const maxPages = items?.totalPages
    const products = items?.products
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    return (
        <div className="min-h-screen bg-background">
            <main className="container px-4 py-6 md:px-6 md:py-8">
                <SortAndViewControls viewMode={viewMode}
                                     setViewMode={setViewMode}
                />
                {viewMode === 'grid' ? (
                    <ProductGrid products={products || []}/>
                ) : (
                    <ProductList products={products || []}/>
                )}
                <PaginationControls
                    totalPages={maxPages || 1}
                />
            </main>
        </div>
    )
}

export default ItemsView
