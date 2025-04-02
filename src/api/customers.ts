import CUSTOMERS from '@/mock/customers.ts'

const getCustomers = async () => {
    return CUSTOMERS
}

const getCustomer = async (id: string) => {
    return CUSTOMERS.find(customer => customer.id === id)
}

export { getCustomers, getCustomer }
