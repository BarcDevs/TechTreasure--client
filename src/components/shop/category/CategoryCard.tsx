import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'
import {Category} from '@/types'
import Icon from '@/components/elements/Icon.tsx'
import {Link} from 'react-router-dom'

const CategoryCard = ({category}: { category: Category }) => {
    const {t} = useTranslation(I18N_NAMESPACES.categories)

    return (
        <Link to={`/categories/${category._id}`} className={'h-[145px] w-[170px]'}>
            <article
                className={'group/card flex-center-col h-[145px] w-[170px] gap-4 rounded border bg-neutral-50 text-black hover:bg-red-500'}>
                <Icon className={'group-hover:invert'} path={category.icon} name={category.name} size={56}/>
                <p className={'text-body text-center group-hover:text-neutral-50'}>{t(category.name)}</p>
            </article>
        </Link>
    )
}


export default CategoryCard
