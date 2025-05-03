export const generateChartData = (salesData: SalesPeriod) => {
    return salesData.value.map((entry) => ({
        period: entry.period,
        sales: entry.amount
    }))
}
