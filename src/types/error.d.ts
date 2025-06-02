type ApiError = {
    status: string
    error?: {
        statusCode: number
        status: string
        isOperational: boolean
    }
    message: string
}
