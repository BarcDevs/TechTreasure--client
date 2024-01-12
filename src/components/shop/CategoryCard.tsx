import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants'
import {Category} from '@/types'
import Icon from '@/components/shared/Icon.tsx'
import {Link} from 'react-router-dom'

const CategoryCard = ({category}: { category: Category }) => {
    const {t} = useTranslation(I18N_NAMESPACES.categories)

    return (
        <Link to={`/categories/${category.id}`} className={'h-[145px] w-[170px]'}>
            <article
                className={'group flex-center-col gap-4 h-[145px] w-[170px] rounded bg-neutral-50 text-black hover:bg-red-500 border'}>
                <Icon className={'group-hover:invert'} path={category.icon} name={category.name} size={56}/>
                <p className={'text-body text-center group-hover:text-neutral-50'}>{t(category.name)}</p>
            </article>
        </Link>
    )
}


export default CategoryCard
