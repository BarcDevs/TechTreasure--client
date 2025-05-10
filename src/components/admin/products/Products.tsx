import {getProducts} from '@/api/products.ts'
import {useQuery} from '@tanstack/react-query'
import {Product} from '@/types'
import {getErrorMessage} from '@/lib/utils/error.ts'
import ProductsTable from '@/components/admin/products/table/ProductsTable.tsx'
import PaginationControls from '@/components/admin/PaginationControls.tsx'

const Products = () => {
    const {data: products, isFetching, isError, error} = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items'],
        queryFn: () => getProducts(),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    const extractedProducts = products?.products

    // todo: add translations

    return (
        <>
            <section className="flex items-center">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        Products
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Manage your products
                    </p>
                </header>
                {/*<Button className="ml-auto bg-red-500 hover:bg-red-500/80" size="sm">*/}
                {/*    <Link to={'add'}>*/}
                {/*        Add product*/}
                {/*    </Link>*/}
                {/*</Button>*/}
            </section>
            <section className="rounded-lg border shadow-sm">
                {!extractedProducts && (
                    isFetching ? <p>Loading...</p> :
                        isError ?
                            <p>{getErrorMessage(error)}</p> :
                            <p className={'p-2'}>
                                You have no products in the store. add one to get started
                            </p>
                )}

                <ProductsTable products={extractedProducts}/>

                {extractedProducts && (
                    <PaginationControls
                        totalItems={extractedProducts.length}
                        itemsPerPage={10}
                        currentPage={1}
                        name={'orders'}
                    />
                )}

            </section>
        </>

    )
}

export default Products
