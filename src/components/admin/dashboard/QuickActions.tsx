import {Button} from '@/components/ui/button.tsx'
import {ClipboardList, DollarSign, Package, PlusCircle, Target} from 'lucide-react'
import {Link} from 'react-router-dom'

const QuickActions = ({}) =>
    (
        <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                    <PlusCircle className="size-6 text-blue-500"/>
                    <span className="text-sm font-medium">
                                Add New Product
                            </span>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                    <Package className="size-6 text-amber-500"/>
                    <span className="text-sm font-medium">
                            <Link to={'/admin/products'}>
                                Manage Inventory
                            </Link>
                        </span>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                    <ClipboardList className="size-6 text-green-500"/>
                    <span className="text-sm font-medium">
                            <Link to={'/admin/orders'}>
                                View Orders
                            </Link>
                        </span>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                    <DollarSign className="size-6 text-purple-500"/>
                    <span className="text-sm font-medium">
                            Check Earnings
                        </span>
                </Button>

                <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-gray-100">
                    <Target className="size-6 text-red-500"/>
                    <span className="text-sm font-medium">
                                Marketing
                            </span>
                </Button>
            </div>
        </section>
    )

export default QuickActions
