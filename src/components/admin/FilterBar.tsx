import { Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import exportToExcel from '@/lib/utils/xlsx'
import {Customer, Order} from '@/types/customer'

type FilterBarProps = {
    searchQuery: string
    setSearchQuery: (query: string) => void
    selectedData: Customer[] | Order[]
    placeholder: string
    filename?: string
}

const FilterBar = ({
                       searchQuery,
                       setSearchQuery,
                       selectedData,
                       placeholder,
                       filename = 'exported-data'
                   }: FilterBarProps) => {
    const handleExport = async () => {
        if (selectedData.length === 0) {
            alert('No data to export')
            return
        }

        try {
            const isCustomerData = '_id' in selectedData[0] && 'name' in selectedData[0]

            const sheetName = isCustomerData ? 'Customers' : 'Orders'

            const excludeFields = ['_id', 'emailPreferences']

            await exportToExcel(
                selectedData,
                filename,
                sheetName,
                excludeFields
            )
        } catch (error) {
            console.error('Export failed:', error)
            alert('Failed to export data. Please try again.')
        }
    }

    return (
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
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex"
                    onClick={handleExport}
                    disabled={selectedData.length === 0}
                >
                    <Download className="mr-2 size-4"/>
                    Export
                </Button>
            </div>
        </div>
    )
}

export default FilterBar
