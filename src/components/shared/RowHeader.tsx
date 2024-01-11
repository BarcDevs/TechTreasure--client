import Icon from '@/components/shared/Icon.tsx'

type ListHeaderProps = {
    name: string,
    headline: string,
    children?: React.ReactNode
}

const RowHeader = ({name, headline, children}: ListHeaderProps) => {
    return (
        <header className={'flex-col-start h-fit w-[90vw]'}>
            <div className={'mb-2.5 flex flex-row items-center justify-start gap-4'}>
                <Icon path={'/assets/icons/rectangle.svg'} name={'rectangle'}/>
                <p className={'text-body-semibold text-red-500'}>{name}</p>
            </div>
            <div className={'flex-row-start'}>
                <h3 className={'text-big mt-2.5'}>{headline}</h3>
                {children}
            </div>
        </header>
    )
}

export default RowHeader
