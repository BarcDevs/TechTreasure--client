type InquiryPageHeaderProps = {
    title?: string
    description?: string
}

const InquiryPageHeader = ({
                               title = 'Customer Inquiries',
                               description = 'Manage and respond to customer inquiries and support requests'
                           }: InquiryPageHeaderProps) => (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
    </div>
)

export default InquiryPageHeader
