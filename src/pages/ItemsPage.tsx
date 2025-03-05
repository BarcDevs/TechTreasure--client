import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'
import {SortAndViewControls} from '@/components/shop/products/SortAndViewControls.tsx'
import {ProductList} from '@/components/shop/products/ProductList.tsx'
import {ProductGrid} from '@/components/shop/products/ProductGrid.tsx'
import {PaginationControls} from '@/components/shop/products/PaginationControls.tsx'
import {useSearchParams} from 'react-router-dom'


const ItemsPage = () => {
    const pageSize = 10
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;
    console.log(searchParams)

    const items = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items', currentPage],
        queryFn: () => getProducts({
            limit: pageSize,
            page: currentPage,
            sort: '{"rating":1}'
        }),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    const maxPages = items.data?.totalPages
    const products = items.data?.products
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

export default ItemsPage
