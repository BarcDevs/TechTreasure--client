import {ReactNode} from 'react'
import {Link} from 'react-router-dom'

export const FOOTER_LINK_STYLE = 'text-neutral-50 text-body text-wrap hover:text-white'

const FooterLinkColumn = ({header, links = [], children, additionalStyles}: {
    header: string,
    links?: { name: string, path: string }[],
    children?: ReactNode,
    additionalStyles?: string
}) => (
    <div className={`inline-flex flex-col items-start justify-start gap-6 ${additionalStyles}`}>
        <div className="text-heading-medium text-neutral-50">{header}</div>
        <div className="flex-col-start flex gap-4">
            {children}
            {links.map(({name, path}) => (
                <Link to={path} key={name} className={FOOTER_LINK_STYLE}>{name}</Link>
            ))}
        </div>
    </div>
)


export default FooterLinkColumn
