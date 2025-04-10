import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx'
import {Calendar, Download, RefreshCw} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {useState} from 'react'

const AnalyticsHeader = ({}) => {
    const [dateRange, setDateRange] = useState('30days')

    return (
        <header className="mb-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        Analytics Dashboard
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Monitor your store's performance and insights
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Select defaultValue={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[180px]">
                            <Calendar className="mr-2 size-4"/>
                            <SelectValue placeholder="Select date range"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="year">This year</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon">
                        <RefreshCw className="size-4"/>
                    </Button>

                    <Button variant="outline">
                        <Download className="mr-2 size-4"/>
                        Export
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default AnalyticsHeader
