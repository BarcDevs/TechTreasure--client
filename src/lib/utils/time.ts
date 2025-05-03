const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return 'N/A'
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}
    return new Date(dateString).toLocaleDateString('en-US', options)
}

// Format datetime to readable format
const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(dateTimeString).toLocaleString('en-US', options)
}

const timeSince = (dateString: string) => {
    const registrationDate = new Date(dateString)
    const currentDate = new Date()

    const diffInMonths =
        (currentDate.getFullYear() - registrationDate.getFullYear()) * 12 +
        (currentDate.getMonth() - registrationDate.getMonth())

    if (diffInMonths < 12) {
        return `${diffInMonths} months`
    } else {
        const years = Math.floor(diffInMonths / 12)
        const months = diffInMonths % 12
        return `${years} year${years > 1 ? 's' : ''}${months > 0 ? `, ${months} month${months > 1 ? 's' : ''}` : ''}`
    }
}

const getWeekday = (day: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[day - 1]
}

export {
    formatDate,
    formatDateTime,
    timeSince,
    getWeekday
}
