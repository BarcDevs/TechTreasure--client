import { Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type FilterBarProps = {
    searchQuery: string
    setSearchQuery: (query: string) => void
    selectedOrders: string[]
}

const FilterBar =
    ({ searchQuery, setSearchQuery, selectedOrders }: FilterBarProps) => (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 size-4 text-gray-400"/>
                <Input
                    type="search"
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button variant="outline" size="icon">
                <Filter className="size-4"/>
            </Button>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="mr-2 size-4"/>
                Export
            </Button>

            {selectedOrders.length > 0 && (
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Bulk Actions"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mark-processing">Mark as Processing</SelectItem>
                        <SelectItem value="mark-delivered">Mark as Delivered</SelectItem>
                        <SelectItem value="mark-cancelled">Mark as Cancelled</SelectItem>
                        <SelectItem value="export-selected">Export Selected</SelectItem>
                    </SelectContent>
                </Select>
            )}
        </div>
    </div>
)

export default FilterBar
