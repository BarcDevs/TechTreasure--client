import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useEffect} from 'react'
import {clearCart} from '@/store/cartSlice.ts'
import {useDispatch} from 'react-redux'

const SuccessPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCart())
    }, [])

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[250px] gap-10'}>
                <h1
                    className="font-inter text-[70px] font-medium leading-[115px] tracking-[3.30px] text-black">
                    {t(GLOBAL_LOCALES.successHeadline)}
                </h1>
                <p className={'text-body text-black'}>
                    {t(GLOBAL_LOCALES.successText)}
                </p>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}

export default SuccessPage
