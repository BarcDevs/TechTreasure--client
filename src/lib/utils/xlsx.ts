import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'

type ExportableData = Array<Record<string, any>>

/**
 * Formats column headers from camelCase to Title Case with spaces
 */
const formatColumnHeader = (header: string): string => {
    if (header === '_id') return 'ID'

    // Convert camelCase to Title Case with spaces
    return header
        .replace(/^_/, '')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
}

/**
 * Downloads data as an Excel file
 */
const exportToExcel = async <T extends ExportableData>(
    data: T,
    filename: string,
    sheetName = 'Sheet1',
    columnsToExclude: string[] = []
): Promise<void> => {
    try {
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet(sheetName)

        if (data.length === 0) {
            throw new Error('No data to export')
        }

        // Get headers from the first object, excluding any specified columns
        const headers = Object.keys(data[0])
            .filter(header => !columnsToExclude.includes(header))

        worksheet.columns = headers.map(header => ({
            header: formatColumnHeader(header),
            key: header,
            width: 20
        }))

        worksheet.addRows(
            data.map(item => {
                const rowData: Record<string, any> = {}
                headers.forEach(header => {
                    rowData[header] = item[header]
                })
                return rowData
            })
        )

        const headerRow = worksheet.getRow(1)
        headerRow.font = { bold: true }
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        }
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer()

        // Convert buffer to blob and save
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `${filename}.xlsx`)

        return Promise.resolve()
    } catch (error) {
        console.error('Error exporting to Excel:', error)
        return Promise.reject(error)
    }
}

export default exportToExcel
