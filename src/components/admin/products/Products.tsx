/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wqUOQWXuSdh
 */
import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import Rating from '@/components/elements/Rating.tsx'
import {Link} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'
import {deleteProduct, getProducts} from '@/api/products.ts'
import {useMutation, useQuery} from '@tanstack/react-query'
import {queryClient} from '@/api'
import {Product} from '@/types'
import {imageUrl} from '@/lib/utils/url.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import {getErrorMessage} from '@/lib/utils/error.ts'

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

    const {mutate: deleteItem} = useMutation({
        mutationFn: deleteProduct,
        onMutate: (id) => {
            const prevItems = queryClient.getQueryData(['items'])
            queryClient.cancelQueries({queryKey: ['items']})
            queryClient.setQueryData(['items'], (old: any) => {
                old.products = old.products.filter((item: Product) => item._id !== id)
            })

            return {prevItems}
        },
        onError: (_, __, {prevItems}: any) => {
            queryClient.setQueryData(['items'], prevItems)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['items']})
        }
    })

    const handleDelete = (id: string) => {
        deleteItem(id)
    }

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
                <Button className="ml-auto bg-red-500 hover:bg-red-500/80" size="sm">
                    <Link to={'add'}>
                        Add product
                    </Link>
                </Button>
            </section>
            <section className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/*TODO: Add sorting*/}
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead className="max-w-[150px]">Name</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">Inventory</TableHead>
                            <TableHead className="hidden md:table-cell">Orders</TableHead>
                            <TableHead className="hidden md:table-cell">Rating</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.products.map(item =>
                            <TableRow key={item._id}>
                                <TableCell>
                                    <img
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        src={imageUrl(isProductWithColors(item) ?
                                            getImagesOfColor(item.mainImage, item.defaultColor, true)[0]?.path :
                                            item.mainImage[0].path)}
                                        height="64"
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link to={`edit/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    ${item.price.toFixed()}
                                </TableCell>
                                <TableCell className={item.stock === 0 ? 'font-bold text-red-500' : 'text-black'}>
                                    {item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {/* TODO item.orders*/ 0}
                                </TableCell>
                                <TableCell className="hidden text-black md:table-cell">
                                    <Rating rating={item.rating}/>
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleDelete(item._id)}>
                                        <Icon path={'/assets/icons/trash.svg'}
                                              name={'Delete'}
                                              size={30}
                                              className={'cursor-pointer hover:opacity-80'}
                                        />
                                    </button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {(!products || products.products.length === 0) && (
                    isFetching ? <p>Loading...</p> :
                        isError ?
                            <p>{getErrorMessage(error)}</p> :
                            <p className={'p-2'}>
                                You have no products in the store. add one to get started
                            </p>
                )}
            </section>
        </>

    )
}
export default Products
