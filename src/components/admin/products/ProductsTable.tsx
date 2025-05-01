import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx'
import {imageUrl} from '@/lib/utils/url.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import {Link} from 'react-router-dom'
import Rating from '@/components/elements/Rating.tsx'
import Icon from '@/components/elements/Icon.tsx'
import {FC} from 'react'
import {Product} from '@/types'
import {useMutation} from '@tanstack/react-query'
import {deleteProduct} from '@/api/products.ts'
import {queryClient} from '@/api'

const ProductsTable: FC<{
    products: Product[] | undefined
}> = ({products}) => {
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

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {/*TODO: Add sorting*/}
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="max-w-[150px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Inventory</TableHead>
                    {/*<TableHead className="hidden md:table-cell">Orders</TableHead>*/}
                    <TableHead className="hidden md:table-cell">Rating</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products && products.map(item =>
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
                        {/*<TableCell className="hidden md:table-cell">*/}
                        {/*    {TODO item.orders}*/}
                        {/*</TableCell>*/}
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
    )
}

export default ProductsTable
