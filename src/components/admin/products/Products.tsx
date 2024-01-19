/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wqUOQWXuSdh
 */
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ITEMS} from '@/constants/mocks.ts'
import {isProductWithColors} from '@/lib/utils.ts'
import Rating from '@/components/elements/Rating.tsx'
import {Link} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'

const Products = () => (
    <main className="flex_col flex-1 gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
            <Button className="ml-auto bg-red-500" size="sm">
                Add product
            </Button>
        </div>
        <div className="rounded-lg border shadow-sm">
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
                    {ITEMS.map(item =>
                        <TableRow>
                            <TableCell>
                                <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    src={isProductWithColors(item) ? item.mainImage[item.defaultColor] : item.mainImage}
                                    height="64"
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                <Link to={`edit/${item.id}`}>
                                    {item.name}
                                </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">${item.price.toFixed()}</TableCell>
                            <TableCell className={item.stock === 0 ? 'text-red-500 font-bold' : 'text-black'}>
                                {item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{/* TODO item.orders*/ 0}</TableCell>
                            <TableCell className="hidden md:table-cell text-black"><Rating rating={item.rating}/></TableCell>
                            <TableCell>
                                <Link to={`delete/${item.id}`}>
                                    <Icon path={'/assets/icons/trash.svg'} name={'Delete'} size={30} className={'hover:opacity-80'}/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </main>

)
export default Products
