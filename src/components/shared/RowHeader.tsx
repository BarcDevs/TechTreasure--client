import Icon from '@/components/elements/Icon.tsx'
import rectangle from '/assets/icons/rectangle.svg'

type ListHeaderProps = {
    name?: string,
    headline: string,
    variant?: 'red' | 'white',
    children?: React.ReactNode
}

const RowHeader = ({name, headline, variant = 'red', children}: ListHeaderProps) => {
    const textVariant = variant === 'red' ? 'text-body-semibold text-red-500' : 'text-black'

    return name ? (
        <header className={'flex-col-start h-fit w-[90vw]'}>
            <div className={'mb-2.5 flex flex-row items-center justify-start gap-4'}>
                <Icon path={rectangle} name={'rectangle'}/>
                <p className={textVariant}>{name}</p>
            </div>
            <div className={'flex_row w-full items-end justify-start gap-20'}>
                <h3 className={'text-big-semibold mt-2.5'}>{headline}</h3>
                {children}
            </div>
        </header>
    ) : (
        <header className={`${children ? 'flex-row-between' : 'flex-row-start'} h-fit w-[90vw]`}>
            <div className={'flex_row items-end justify-start gap-4'}>
                <Icon path={rectangle} name={'rectangle'}/>
                <h3 className={textVariant}>{headline}</h3>
            </div>
            {children}
        </header>
    )
}

export default RowHeader
