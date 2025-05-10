export const getColumnWidthClass = (columnId: string): string => {
    switch (columnId) {
        case 'image':
            return 'w-[5rem]'        // 80px
        case 'name':
            return 'w-[9.375rem]'    // 150px
        case 'price':
            return 'w-[6.25rem]'     // 100px
        case 'stock':
            return 'w-[9.375rem]'    // 150px
        case 'rating':
            return 'w-[6.25rem]'     // 100px
        case 'actions':
            return 'w-[5rem]'        // 80px
        default:
            return 'w-auto'
    }
}
