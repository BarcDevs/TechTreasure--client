import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Search} from 'lucide-react'
import {inquiryStatus} from '@/components/admin/inquiries/inquiryUtils.ts'

type InquiryFiltersProps = {
    searchTerm: string
    statusFilter: string
    onSearchChange: (value: string) => void
    onStatusFilterChange: (value: string) => void
}

const InquiryFilters = ({
                            searchTerm,
                            statusFilter,
                            onSearchChange,
                            onStatusFilterChange
                        }: InquiryFiltersProps) => (
    <Card>
        <CardHeader>
            <CardTitle>
                Filter Inquiries
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                    <Label htmlFor="search">
                        Search
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground"/>
                        <Input
                            id="search"
                            placeholder="Search by customer name, email, or message..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="w-full md:w-48">
                    <Label htmlFor="status">
                        Status
                    </Label>
                    <Select
                        value={statusFilter}
                        onValueChange={onStatusFilterChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.entries(inquiryStatus)
                                    .map((status) => (
                                        <SelectItem value={status[0]}>
                                            {status[1]}
                                        </SelectItem>
                                    ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
    </Card>
)

export default InquiryFilters
