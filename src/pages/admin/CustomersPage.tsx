import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {getCustomers} from '@/api/customers.ts'
import PageHeader from '@/components/admin/layout/PageHeader.tsx'
import CustomerFilterBar from '@/components/admin/customers/CustomerFilterBar'
import CustomerStatusTabs from '@/components/admin/customers/CustomerStatusTabs'
import CustomerPagination from '@/components/admin/customers/CustomerPagination'

const CustomersPage = () => {
    const customers = useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
        refetchOnWindowFocus: false
    })
    const [activeTab, setActiveTab] = useState('all')
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    // Filter customers based on active tab and search query
    const filteredCustomers = customers.data?.filter((customer) => {
        // Filter by tab
        if (activeTab === 'active' && customer.status !== 'active') return false
        if (activeTab === 'inactive' && customer.status !== 'inactive') return false
        if (activeTab === 'loyal' && !customer.tags.includes('loyal')) return false
        if (activeTab === 'high-value' && !customer.tags.includes('high-value')) return false
        if (activeTab === 'at-risk' && !customer.tags.includes('at-risk')) return false

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return (
                customer.id.toLowerCase().includes(query) ||
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.location.toLowerCase().includes(query)
            )
        }

        return true
    })

    // Handle select all customers
    const handleSelectAll = () => {
        if (!filteredCustomers) return
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([])
        } else {
            setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
        }
    }

    // Handle select individual customer
    const handleSelectCustomer = (customerId: string) => {
        if (selectedCustomers.includes(customerId)) {
            setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
        } else {
            setSelectedCustomers([...selectedCustomers, customerId])
        }
    }

    // Format date to readable format
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never'
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <PageHeader
                    title={'Customers'}
                    subtitle={'Manage your customer base and relationships'}
                />

                <CustomerFilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCustomers={selectedCustomers}
                />

                {filteredCustomers && (
                    <CustomerStatusTabs
                        filteredCustomers={filteredCustomers}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        selectedCustomers={selectedCustomers}
                        onSelectAll={handleSelectAll}
                        onSelectCustomer={handleSelectCustomer}
                        formatDate={formatDate}
                    />
                )}

                {filteredCustomers && (
                    <CustomerPagination
                        totalItems={filteredCustomers.length}
                        itemsPerPage={10}
                        currentPage={1}
                    />
                )}
            </div>
        </div>
    )
}

export default CustomersPage
