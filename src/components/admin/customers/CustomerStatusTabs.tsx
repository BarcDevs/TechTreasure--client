import {Card} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs'
import CustomersTab from '@/components/admin/CustomersTab'
import CustomersTable from '@/components/admin/customers/CustomersTable'
import CUSTOMERS from '@/mock/customers.ts'

type CustomerStatusTabsProps = {
    filteredCustomers: typeof CUSTOMERS
    activeTab: string
    setActiveTab: (tab: string) => void
    selectedCustomers: string[]
    onSelectAll: () => void
    onSelectCustomer: (customerId: string) => void
}

const CustomerStatusTabs = ({
                                filteredCustomers,
                                activeTab,
                                setActiveTab,
                                selectedCustomers,
                                onSelectAll,
                                onSelectCustomer
                            }: CustomerStatusTabsProps) => {
    const tabValues = [
        {name: 'All Customers', value: 'all'},
        {name: 'Active', value: 'active'},
        {name: 'Inactive', value: 'inactive'},
        {name: 'Loyal', value: 'loyal'},
        {name: 'High Value', value: 'high-value'},
        {name: 'At Risk', value: 'at-risk'}
    ]

    return (
        <Card className="mb-6 overflow-hidden">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
                    {tabValues.map(tab => (
                        <CustomersTab
                            key={tab.value}
                            name={tab.name}
                            value={tab.value}
                        />
                    ))}
                </TabsList>

                {tabValues.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="m-0">
                        <CustomersTable
                            customers={filteredCustomers}
                            selectedCustomers={selectedCustomers}
                            onSelectAll={onSelectAll}
                            onSelectCustomer={onSelectCustomer}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    )
}

export default CustomerStatusTabs
