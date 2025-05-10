import {useState} from 'react'
import type {FC} from 'react'
import {useMutation} from '@tanstack/react-query'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {Input} from '@/components/ui/input'
import {imageUrl} from '@/lib/utils/url'
import {isProductWithColors} from '@/lib/utils/product'
import {getImagesOfColor} from '@/lib/utils/image'
import Rating from '@/components/elements/Rating'
import Icon from '@/components/elements/Icon'
import {deleteProduct} from '@/api/products'
import {queryClient} from '@/api'
import type {Product} from '@/types'

const STOCK_THRESHOLD = 50

const ProductsTable: FC<{
    products: Product[] | undefined
}> = ({products = []}) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

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

    const columns: ColumnDef<Product>[] = [
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
                <div className="hidden md:block">
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-0 font-medium"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Price
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
            cell: ({row}) => {
                const price = parseFloat(row.original.price.toString())
                return <div className="hidden md:block">${price.toFixed(2)}</div>
            }
        },
        {
            accessorKey: 'stock',
            header: ({column}) => (
                <div className="hidden md:block">
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-0 font-medium"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Inventory
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
                <div className="hidden md:block">
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-0 font-medium"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Rating
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
            cell: ({row}) => (
                <div className="hidden md:block">
                    <Rating rating={row.original.rating}/>
                </div>
            )
        },
        {
            id: 'actions',
            header: () => <div></div>,
            cell: ({row}) => {
                const product = row.original

                return (
                    <button
                        onClick={() => deleteItem(product._id)}
                        className="flex items-center justify-center"
                    >
                        <Icon
                            path="/assets/icons/trash.svg"
                            name="Delete"
                            size={30}
                            className="cursor-pointer hover:opacity-80"
                        />
                    </button>
                )
            }
        }
    ]

    const table = useReactTable({
        data: products,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('name')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{
                                            width: header.column.id === 'image' ? '80px' :
                                                header.column.id === 'name' ? '150px' :
                                                    header.column.id === 'price' ? '100px' :
                                                        header.column.id === 'stock' ? '150px' :
                                                            header.column.id === 'rating' ? '100px' :
                                                                header.column.id === 'actions' ? '80px' : 'auto'
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={{
                                                width: cell.column.id === 'image' ? '80px' :
                                                    cell.column.id === 'name' ? '150px' :
                                                        cell.column.id === 'price' ? '100px' :
                                                            cell.column.id === 'stock' ? '150px' :
                                                                cell.column.id === 'rating' ? '100px' :
                                                                    cell.column.id === 'actions' ? '80px' : 'auto'
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductsTable
