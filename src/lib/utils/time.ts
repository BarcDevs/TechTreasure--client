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

const timeSince = (dateString: string): string => {
    const past = new Date(dateString)
    const now = new Date()

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    const minutes = Math.floor(diffInSeconds / 60)
    const hours = Math.floor(diffInSeconds / 3600)
    const days = Math.floor(diffInSeconds / 86400)
    const months = Math.floor(diffInSeconds / (30 * 86400))
    const years = Math.floor(diffInSeconds / (365 * 86400))

    if (minutes < 1) {
        return 'just now'
    }

    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`
    }

    if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''}`
    }

    if (days < 30) {
        return `${days} day${days > 1 ? 's' : ''}`
    }

    if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''}`
    }

    return `${years} year${years > 1 ? 's' : ''}`
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
