import RowHeader from '@/components/shared/RowHeader.tsx'
import Button from '@/components/elements/Button.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Item} from '@radix-ui/react-select'

const ForYou = ({}) => {
    const {t} = useTranslation([I18N_NAMESPACES.global])

    return (
        <section className={'flex-center-col w-full gap-[60px]'}>
            <RowHeader headline={'Just For You'} variant={'white'}>
                <Link to={`/products`}>
                    <Button variant={'white'} text={t(GLOBAL_LOCALES.viewAll)}/>
                </Link>
            </RowHeader>
            <ul className={'flex-start-around max-sm:flex-center-col flex-row flex-wrap gap-5'}>
                {[...ITEMS.slice(0, 4)].map(item => (
                    <li key={item._id} className={'shrink-0'}>
                        <Item item={item}/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ForYou
