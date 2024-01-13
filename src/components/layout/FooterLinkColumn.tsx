import {ReactNode} from 'react'
import {Link} from 'react-router-dom'
import {LINK} from '@/types/constants'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'

export const FOOTER_LINK_STYLE = 'text-neutral-50 text-body text-wrap hover:text-white'

const FooterLinkColumn = ({header, links = [], children, additionalStyles}: {
    header: string,
    links?: LINK[],
    children?: ReactNode,
    additionalStyles?: string
}) => {
    const {t} = useTranslation(I18N_NAMESPACES.footerLinks)

    return (
        <div className={`inline-flex flex-col items-start justify-start gap-6 ${additionalStyles}`}>
            <h3 className="text-heading-medium text-neutral-50">{header}</h3>
            <div className="flex-col-start flex gap-4">
                {children}
                {links.map(({path, key}) => (
                    <Link to={path} key={key} className={FOOTER_LINK_STYLE}>{t(key)}</Link>
                ))}
            </div>
        </div>
    )
}


export default FooterLinkColumn
