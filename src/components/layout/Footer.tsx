import send from '/assets/icons/send.svg'
import FooterLinkColumn, {FOOTER_LINK_STYLE} from '@/components/layout/FooterLinkColumn.tsx'
import {FOOTER_LINKS, SUPPORT_DETAILS} from '@/constants/footer.ts'
import Icon from '@/components/elements/Icon.tsx'
import {APP_NAME, SOCIAL_LINKS} from '@/constants'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const Footer = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <footer
            className="mt-[9rem] inline-flex w-full flex-col items-center justify-end bg-black pb-6 pt-20 max-sm:mt-12 max-sm:pt-10">
            <div className={'inline-flex w-[90%] gap-7 max-lg:mb-5 max-lg:flex-col-reverse'}>
                <div className="flex-center-row inline-flex gap-2 md:hidden">
                    <div className={'inline-flex gap-2 px-2'}>
                        {SOCIAL_LINKS.map(social => (
                            <a href={social.url} key={social.name}> <Icon path={social.icon} name={social.name}/></a>
                        ))}
                    </div>
                    <a href={'#'} className="relative h-10 w-[110px] bg-black">
                        <img
                            alt={'Play Store'}
                            className="absolute left-[3px] top-[5px] h-[30px] w-[104px] rounded border border-neutral-50"
                            src="/assets/images/google-play.png"/>
                    </a>

                    <a href={'#'}
                       className="inline-flex h-10 w-[110px] items-center justify-center bg-black p-[3px]">
                        <img
                            alt={'App Store'}
                            className="h-[34px] w-[104px] rounded border border-white"
                            src="/assets/images/app-store.png"/>
                    </a>
                </div>

                <div className="flex-col-start max-lg:flex-center-row inline-flex gap-6 max-lg:justify-around">
                    <h2
                        className="text-large text-neutral-50 max-lg:hidden">
                        {APP_NAME}
                    </h2>
                    <div className="text-heading-medium text-neutral-50 max-lg:hidden">
                        {t(GLOBAL_LOCALES.subscribe)}
                    </div>
                    <div>
                        <div className="text-body pb-1 text-neutral-50">
                            {t(GLOBAL_LOCALES.subscribePromo)}
                        </div>
                        <div
                            className="inline-flex w-[217px] items-center justify-start rounded border border-neutral-50 py-3">
                            <input
                                type="email"
                                className="no-focus w-[180px] bg-black pl-4 font-poppins text-base font-normal leading-normal text-neutral-50 opacity-40 outline-none"
                                placeholder={t(GLOBAL_LOCALES.emailPlaceholder)}/>
                            <img src={send} alt="send"/>
                        </div>
                    </div>
                </div>

                <div className="flex-start-between mb-[30px] inline-flex h-fit w-[90%] gap-5 max-lg:mb-0">
                    <FooterLinkColumn header={t(GLOBAL_LOCALES.support)}>
                        <p className={`${FOOTER_LINK_STYLE} max-w-[200px]`}>{SUPPORT_DETAILS.address}</p>
                        <a href={`mailto:${SUPPORT_DETAILS.email}?subject=Support`}
                           className={FOOTER_LINK_STYLE}>{SUPPORT_DETAILS.email}</a>
                        <a href={`tel:${SUPPORT_DETAILS.phone}`}
                           className={FOOTER_LINK_STYLE}>{SUPPORT_DETAILS.phone}</a>
                    </FooterLinkColumn>

                    <FooterLinkColumn header={t(GLOBAL_LOCALES.account)} links={FOOTER_LINKS.account}/>
                    <FooterLinkColumn header={t(GLOBAL_LOCALES.quickLinks)} links={FOOTER_LINKS.quickLinks}/>

                    <FooterLinkColumn header={t(GLOBAL_LOCALES.downloadApp)} additionalStyles={'max-md:hidden'}>
                        <div className="flex-col-start flex gap-2">
                            <div
                                className="text-tiny text-neutral-50 opacity-70">
                                {t(GLOBAL_LOCALES.appPromo)}
                            </div>
                            <div className="inline-flex items-center justify-start gap-2">
                                <div className="flex-center h-20 w-20 bg-black p-0.5">
                                    <img alt={'QR Code'}
                                         className="h-[76px] w-[76px] border-2 border-white"
                                         src="/assets/images/QR-code.jpeg"/>
                                </div>
                                <div className="flex-col-start inline-flex gap-1">
                                    <a href={'#'} className="relative h-10 w-[110px] bg-black">
                                        <img
                                            alt={'Play Store'}
                                            className="absolute left-[3px] top-[5px] h-[30px] w-[104px] rounded border border-neutral-50"
                                            src="/assets/images/google-play.png"/>
                                    </a>

                                    <a href={'#'}
                                       className="inline-flex h-10 w-[110px] items-center justify-center bg-black p-[3px]">
                                        <img
                                            alt={'App Store'}
                                            className="h-[34px] w-[104px] rounded border border-white"
                                            src="/assets/images/app-store.png"/>
                                    </a>
                                </div>
                            </div>
                            <div className={'inline-flex w-full justify-between px-2'}>
                                {SOCIAL_LINKS.map(social => (
                                    <a href={social.url} key={social.name}> <Icon path={social.icon}
                                                                                  name={social.name}/></a>
                                ))}
                            </div>
                        </div>
                    </FooterLinkColumn>
                </div>
            </div>

            <div className="inline-flex flex-col items-center justify-start gap-4 opacity-40">
                <div className="inline-flex h-[0px] w-[1440px] items-center justify-center opacity-50">
                    <div className="h-[0px] w-[1440px] border border-white opacity-40"></div>
                </div>
                <div className="inline-flex items-center justify-start gap-3 opacity-60">
                    <div className="font-poppins text-base font-normal leading-normal text-white">
                        {t(GLOBAL_LOCALES.copyright)}
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
