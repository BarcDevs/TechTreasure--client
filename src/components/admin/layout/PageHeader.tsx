const PageHeader =
    ({title, subtitle}: {title: string, subtitle: string}) => (
    <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
        </h1>
        <p className="mt-1 text-gray-500">
            {subtitle}
        </p>
    </header>
)

export default PageHeader
