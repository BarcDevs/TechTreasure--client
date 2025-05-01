import {TabsTrigger} from '@/components/ui/tabs.tsx'

const CustomersTab = ({name, value}: { name: string, value: string }) =>
    (
        <TabsTrigger
            value={value}
            className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
            {name}
        </TabsTrigger>
    )

export default CustomersTab
