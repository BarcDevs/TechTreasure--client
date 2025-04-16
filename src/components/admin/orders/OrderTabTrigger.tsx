import { TabsTrigger } from '@/components/ui/tabs'

type OrderTabTriggerProps = {
    value: string
    label: string
}

const OrderTabTrigger = ({ value, label }: OrderTabTriggerProps) => (
    <TabsTrigger
        value={value}
        className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
    >
        {label}
    </TabsTrigger>
)

export default OrderTabTrigger
