const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
}

export { formatCurrency, formatPercentage }
