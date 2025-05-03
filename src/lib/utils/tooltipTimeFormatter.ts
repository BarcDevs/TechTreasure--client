export const tooltipTimeFormatter = (timestamp: number, timePeriod: string, additionalDateText?: string) => {
    return timePeriod === 'today' ?
        `${timestamp}:00` :
        timePeriod === 'week' ?
            timestamp :
            `${timestamp}${additionalDateText}`

}
