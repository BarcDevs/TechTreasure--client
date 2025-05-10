import {TableBody, TableCell, TableRow} from '@/components/ui/table.tsx'
import {ColumnDef, flexRender, Table} from '@tanstack/react-table'
import {Product} from '@/types'
import {FC} from 'react'

type Props = {
    table: Table<Product>
    columns?: ColumnDef<Product>[]
}

const ProductTableBody: FC<Props> = ({table, columns}) =>
    (
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
                        colSpan={columns?.length}
                        className="h-24 text-center"
                    >
                        No products found.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>

    )

export default ProductTableBody
