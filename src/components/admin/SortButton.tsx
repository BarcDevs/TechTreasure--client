import {FC} from 'react'
import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'

type Props = {
    label: string
    data: any[]
    columnToPropertyMap: Record<string, string>
    setSortedData: (data: any[]) => void
    setSortField: (field: string) => void
    sortField: string
    setSortDirection: (direction: 'asc' | 'desc' | '') => void
    sortDirection: 'asc' | 'desc' | ''
}

const sortObjects = (objects: any[],
                     field: string | '',
                     direction: 'asc' | 'desc' | '') => {
    if (field === '' || direction === '') return objects
    return objects.sort((a, b) => {
        const valueA = a[field] || ''
        const valueB = b[field] || ''
        if (valueA < valueB) return direction === 'asc' ? -1 : 1
        if (valueA > valueB) return direction === 'asc' ? 1 : -1
        return 0
    })
}

const SortButton: FC<Props> = ({
                                   label,
                                   data,
                                   columnToPropertyMap,
                                   setSortedData,
                                   sortField,
                                   setSortField,
                                   setSortDirection,
                                   sortDirection
                               }) => {
    const handleSort = (field: string) => {
        if (sortField === field)
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        else {
            setSortField(field)
            setSortDirection('asc')
        }

        setSortedData(sortObjects(data, sortField, sortDirection))
    }

    return (
        <th className="px-4 py-3">
            <div className="flex items-center">
                {label}
                <button
                    onClick={() => handleSort(columnToPropertyMap[label])}
                    className="ml-1 focus:outline-none"
                    aria-label={`Sort by ${label}`}
                >
                    {sortField === columnToPropertyMap[label] ? (
                        sortDirection === 'asc' ? (
                            <ArrowUp className="size-3"/>
                        ) : (
                            <ArrowDown className="size-3"/>
                        )
                    ) : (
                        <ArrowUpDown className="size-3"/>
                    )}
                </button>
            </div>
        </th>
    )
}

export default SortButton
