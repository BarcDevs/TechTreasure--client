import {useEffect, useState} from 'react'
import PageHeader from '@/components/admin/layout/PageHeader.tsx'
import CustomerStatusTabs from '@/components/admin/customers/CustomerStatusTabs'
import CustomerPagination from '@/components/admin/customers/CustomerPagination'
import {Customer} from '@/types/customer'
import {useLoaderData} from 'react-router-dom'
import FilterBar from '@/components/admin/FilterBar.tsx'
import {formatDateTime} from '@/lib/utils/time.ts'

const getFilteredCustomers = (
    customers: Customer[] | undefined,
    activeTab: string,
    searchQuery: string
): Customer[] => {
    if (!customers) return []

    return customers.filter((customer) => {
        const statusMatch = activeTab === 'all' || customer.status === activeTab

        const searchMatch = searchQuery
            ? [customer._id, customer.name, customer.email, customer.location].some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : true

        return statusMatch && searchMatch
    })
}

const CustomersPage = () => {
    const customers = useLoaderData() as Customer[]
    const [activeTab, setActiveTab] = useState('all')
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])

    useEffect(() => {
        customers && customers ?
            setFilteredCustomers(getFilteredCustomers(customers, activeTab, searchQuery)) :
            setFilteredCustomers([])
    }, [activeTab, searchQuery, customers])

    const handleSelectAll = () => {
        if (!filteredCustomers) return
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([])
        } else {
            setSelectedCustomers(filteredCustomers.map((customer) => customer._id))
        }
    }

    const handleSelectCustomer = (customerId: string) => {
        if (selectedCustomers.includes(customerId)) {
            setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
        } else {
            setSelectedCustomers([...selectedCustomers, customerId])
        }
    }

    const getSelectedCustomerData = (): any[] => {
        if (!filteredCustomers) return []

        return filteredCustomers
            .filter(customer => selectedCustomers.includes(customer._id))
            .map(customer => {
                const {
                    _id,
                    name,
                    email,
                    phone,
                    tags,
                    registrationDate,
                    lastPurchase,
                    lastLogin,
                    totalOrders,
                    status,
                    location,
                    totalSpent
                } = customer

                return {
                    _id,
                    name,
                    email,
                    phone,
                    tags: Array.isArray(tags) ? tags.join(', ') : '',
                    registrationDate: formatDateTime(registrationDate),
                    lastPurchase: formatDateTime(lastPurchase ?? ''),
                    lastLogin: formatDateTime(lastLogin),
                    totalOrders,
                    status,
                    location,
                    totalSpent
                }
            })
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <PageHeader
                    title={'Customers'}
                    subtitle={'Manage your customer base and relationships'}
                />

                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedData={getSelectedCustomerData()}
                    placeholder={'Search customers...'}
                    filename={'exported-customers'}
                />

                {filteredCustomers && (
                    <CustomerStatusTabs
                        filteredCustomers={filteredCustomers}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        selectedCustomers={selectedCustomers}
                        onSelectAll={handleSelectAll}
                        onSelectCustomer={handleSelectCustomer}
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
