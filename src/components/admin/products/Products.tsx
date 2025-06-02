import {getProducts} from '@/api/products.ts'
import {useQuery} from '@tanstack/react-query'
import {Product} from '@/types'
import {getErrorMessage} from '@/lib/utils/error.ts'
import ProductsTable from '@/components/admin/products/table/ProductsTable.tsx'
import {Link, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Button from '@/components/elements/Button.tsx'

const Products = () => {
    const {data, isFetching, isError, error} = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items'],
        queryFn: () => getProducts(),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    const location = useLocation().pathname
    const [lowStock, setLowStock] = useState(location.includes('low-stock'))

    useEffect(() => {
        setLowStock(location.includes('low-stock'))
    }, [location])

    const products = data?.products
    const lowStockProducts =
        products?.filter(product => product.stock < 10)

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
                {!products && (
                    isFetching ? <p>Loading...</p> :
                        isError ?
                            <p>{getErrorMessage(error)}</p> :
                            <p className={'p-2'}>
                                You have no products in the store. add one to get started
                            </p>
                )}

                <ProductsTable products={!lowStock ? products : lowStockProducts}/>

            </section>
            {lowStock && (
                <div className={'flex_row mt-4 justify-center'}>
                    <Button>
                        <Link to={'/admin/products'}>
                            View all products
                        </Link>
                    </Button>
                </div>
            )}
        </>

    )
}

export default Products
