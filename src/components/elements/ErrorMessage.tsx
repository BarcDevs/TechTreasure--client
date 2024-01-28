const ErrorMessage = ({message} : {message: string}) => (
    <p className={'text-sm font-medium text-destructive'}>
        {message}
    </p>
)


export default ErrorMessage
