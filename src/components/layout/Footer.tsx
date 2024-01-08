import send from '/assets/icons/send.svg'
import FooterLinkColumn, {FOOTER_LINK_STYLE} from '@/components/layout/FooterLinkColumn.tsx'
import {FOOTER_LINKS, SUPPORT_DETAILS} from '@/constants/footer.ts'
import {APP_NAME, LAYOUT_CAPTIONS} from '@/constants/captions/en.ts'
import Icon from '@/components/shared/Icon.tsx'
import {SOCIAL_LINKS} from '@/constants'

const Footer = ({}) => (
    <footer
        className="inline-flex w-full flex-col items-center justify-end bg-black pb-6 pt-20">
        <div className="flex-start-between m-[60px] inline-flex h-fit w-[90%] gap-5">
            {/************************/}
            <div className="flex-col-start inline-flex gap-6">
                <div
                    className="text-large text-neutral-50">
                    {APP_NAME}
                </div>
                <div className="text-heading-medium text-neutral-50">
                    {LAYOUT_CAPTIONS.subscribe}
                </div>
                <div>
                    <div className="text-body pb-1 text-neutral-50">
                        {LAYOUT_CAPTIONS.subscribePromo}
                    </div>
                    <div
                        className="inline-flex w-[217px] items-center justify-start rounded border border-neutral-50 py-3">
                        <input
                            type="email"
                            className="no-focus w-[180px] bg-black pl-4 font-poppins text-base font-normal leading-normal text-neutral-50 opacity-40 outline-none"
                            placeholder="Enter your email"/>
                        <img src={send} alt="send"/>
                    </div>
                </div>
            </div>
            {/************************/}
            <FooterLinkColumn header={'Support'}>
                <p className={FOOTER_LINK_STYLE}>{SUPPORT_DETAILS.address}</p>
                <a href={`mailto:${SUPPORT_DETAILS.email}?subject=Support`}
                   className={FOOTER_LINK_STYLE}>{SUPPORT_DETAILS.email}</a>
                <a href={`tel:${SUPPORT_DETAILS.phone}`} className={FOOTER_LINK_STYLE}>{SUPPORT_DETAILS.phone}</a>
            </FooterLinkColumn>

            <FooterLinkColumn header={'Account'} links={FOOTER_LINKS.account}/>
            <FooterLinkColumn header={'Quick Link'} links={FOOTER_LINKS.quickLinks}/>

            <FooterLinkColumn header={'Download App'}>
                <div className="flex-col-start flex gap-2">
                    <div
                        className="text-tiny text-neutral-50 opacity-70">
                        Save $3 with App, New User Only
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
                                <a href={social.url} key={social.name}> <Icon path={social.icon} name={social.name}/></a>
                            ))}
                        </div>
        </div>

        {/* ***************** */}
        <div className="inline-flex flex-col items-center justify-start gap-4 opacity-40">
            <div className="inline-flex h-[0px] w-[1440px] items-center justify-center opacity-50">
                <div className="h-[0px] w-[1440px] border border-white opacity-40"></div>
            </div>
            <div className="inline-flex items-center justify-start gap-3 opacity-60">
                <div className="font-poppins text-base font-normal leading-normal text-white">
                    {LAYOUT_CAPTIONS.copyright}
                </div>
            </div>
        </div>
    </footer>
)


export default Footer
