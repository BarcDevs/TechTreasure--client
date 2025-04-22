import { Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FilterBarProps = {
    searchQuery: string
    setSearchQuery: (query: string) => void
    selectedData: string[]
    placeholder: string
}

const FilterBar = ({
                               searchQuery,
                               setSearchQuery,
                               selectedData,
    placeholder
                           }: FilterBarProps) => (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 size-4 text-gray-400"/>
                <Input
                    type="search"
                    placeholder={placeholder}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {/*<Button variant="outline" size="icon">*/}
            {/*    <Filter className="size-4"/>*/}
            {/*</Button>*/}
        </div>

        {/*todo: export to xls*/}
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="mr-2 size-4"/>
                Export
            </Button>

            {/*{selectedCustomers.length > 0 && (*/}
            {/*    <Select>*/}
            {/*        <SelectTrigger className="w-[180px]">*/}
            {/*            <SelectValue placeholder="Bulk Actions"/>*/}
            {/*        </SelectTrigger>*/}
            {/*        <SelectContent>*/}
            {/*            <SelectItem value="add-tag">Add Tag</SelectItem>*/}
            {/*            <SelectItem value="remove-tag">Remove Tag</SelectItem>*/}
            {/*            <SelectItem value="send-email">Send Email</SelectItem>*/}
            {/*            <SelectItem value="export-selected">Export Selected</SelectItem>*/}
            {/*        </SelectContent>*/}
            {/*    </Select>*/}
            {/*)}*/}
        </div>
    </div>
)

export default FilterBar
