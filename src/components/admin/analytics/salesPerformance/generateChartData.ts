import {getWeekday} from '@/lib/utils/time.ts'

export const generateChartData = (salesData: SalesPeriod, salesTimeframe: Timeframe) =>
    salesData.value.map((entry) => {
        let periodLabel = ''

        if (salesTimeframe === 'today') {
            periodLabel = `${entry.period}`
        } else if (salesTimeframe === 'week') {
            periodLabel = getWeekday(entry.period)
        } else {
            periodLabel = `${entry.period}`
        }

        return {
            period: periodLabel,
            sales: entry.amount
        }
    })
