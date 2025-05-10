import {ColumnDef} from '@tanstack/react-table'
import type {Product} from '@/types'
import {imageUrl} from '@/lib/utils/url.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import Rating from '@/components/elements/Rating.tsx'
import ColumnSort from '@/components/admin/products/table/ColumnSort.tsx'
import {Button} from '@/components/ui/button.tsx'
import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'

const STOCK_THRESHOLD = 50

const productTableColumns: ColumnDef<Product>[] = [
    {
        accessorKey: 'image',
        header: () => <></>,
        cell: ({row}) => {
            const item = row.original
            return (
                <div className="flex items-center">
                    <img
                        alt="Product image"
                        className="aspect-square size-16 rounded-md object-cover"
                        src={imageUrl(
                            isProductWithColors(item)
                                ? getImagesOfColor(item.mainImage, item.defaultColor, true)[0]?.path
                                : item.mainImage[0].path
                        )}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: 'name',
        header: ({column}) => (
            <div>
                <Button
                    variant="ghost"
                    className="w-full justify-start p-0 font-medium"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="ml-2 size-4"/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="ml-2 size-4"/>
                    ) : (
                        <ArrowUpDown className="ml-2 size-4"/>
                    )}
                </Button>
            </div>
        ),
        cell: ({row}) => <div className="font-medium">{row.original.name}</div>
    },
    {
        accessorKey: 'price',
        header: ({column}) => (
            <ColumnSort column={column} name={'Price'}/>
        ),
        cell: ({row}) => {
            const price = parseFloat(row.original.price.toString())
            return <div className="hidden md:block">
                ${price.toFixed(2)}
            </div>
        }
    },
    {
        accessorKey: 'stock',
        header: ({column}) => (
            <ColumnSort
                column={column}
                name={'Stock'}
            />
        ),
        cell: ({row}) => {
            const stock = row.original.stock
            return (
                <div className={
                    stock === 0 ? 'font-bold text-red-500' :
                        stock < STOCK_THRESHOLD ? 'font-bold text-yellow-500' :
                            'text-black'
                }>
                    {stock === 0 ? 'Out of stock' : `${stock} in stock`}
                </div>
            )
        }
    },
    {
        accessorKey: 'rating',
        header: ({column}) => (
            <ColumnSort
                column={column}
                name={'Rating'}
            />
        ),
        cell: ({row}) => (
            <div className="hidden md:block">
                <Rating rating={row.original.rating}/>
            </div>
        )
    }
]

export default productTableColumns
