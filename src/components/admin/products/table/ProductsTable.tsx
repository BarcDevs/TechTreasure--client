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

import {
    Table,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {Input} from '@/components/ui/input'
import Icon from '@/components/elements/Icon'
import {deleteProduct} from '@/api/products'
import {queryClient} from '@/api'
import type {Product} from '@/types'
import productTableColumns from '@/components/admin/products/table/productTableColumns.tsx'
import {getColumnWidthClass} from '@/components/admin/products/table/getColumnWidthClass.ts'
import ProductTableBody from '@/components/admin/products/table/ProductTableBody.tsx'

type Props = {
    products: Product[] | undefined
}

const ProductsTable: FC<Props> = ({products = []}) => {
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
        ...productTableColumns,
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
                                            width: getColumnWidthClass(header.column.id)
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
                    <ProductTableBody
                        table={table}
                        columns={columns}
                    />
                </Table>
            </div>
        </div>
    )
}

export default ProductsTable
