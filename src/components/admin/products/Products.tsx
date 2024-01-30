/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wqUOQWXuSdh
 */
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {getErrorMessage, getImagesOfColor, isProductWithColors} from '@/lib/utils.ts'
import Rating from '@/components/elements/Rating.tsx'
import {Link} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'
import {useShop} from '@/hooks/useShop.ts'
import {deleteProduct} from '@/api/products.ts'
import {useMutation} from '@tanstack/react-query'
import {queryClient} from '@/api'
import {Product} from '@/types'

const Products = () => {
    const {data: store, isFetching, isError, error} = useShop()
    const {mutate: deleteItem} = useMutation({
        mutationFn: deleteProduct,
        onMutate: (id) => {
            const prevItems = queryClient.getQueryData(['store', 'items'])
            queryClient.cancelQueries({queryKey: ['store', 'items']})
            queryClient.setQueryData(['store', 'items'], (old: any) => {
                old.products = old.products.filter((item: Product) => item._id !== id)
            })

            return {prevItems}
        },
        onError: (_, __, {prevItems}: any) => {
            queryClient.setQueryData(['store', 'items'], prevItems)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['store', 'items']})
        }
    })

    const handleDelete = (id: string) => {
        deleteItem(id)
    }

    return (
        <>
            <section className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
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
                        {store?.products && store.products.map(item =>
                            <TableRow key={item._id}>
                                <TableCell>
                                    <img
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        src={isProductWithColors(item) ?
                                            getImagesOfColor(item.mainImage, item.defaultColor, true)[0]?.path :
                                            item.mainImage[0].path}
                                        height="64"
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link to={`edit/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">${item.price.toFixed()}</TableCell>
                                <TableCell className={item.stock === 0 ? 'text-red-500 font-bold' : 'text-black'}>
                                    {item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{/* TODO item.orders*/ 0}</TableCell>
                                <TableCell className="hidden md:table-cell text-black"><Rating
                                    rating={item.rating}/></TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleDelete(item._id)}>
                                        <Icon path={'/assets/icons/trash.svg'}
                                              name={'Delete'}
                                              size={30}
                                              className={'hover:opacity-80 cursor-pointer'}
                                        />
                                    </button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {(!store?.products || store?.products.length === 0) && (
                    isFetching ? <p>Loading...</p> :
                        isError ?
                            <p>{getErrorMessage(error)}</p> :
                            <p>No products found</p>
                )}
            </section>
        </>

    )
}
export default Products
