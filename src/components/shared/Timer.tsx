import useTimer from '@/hooks/useTimer.ts'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'

const Digit = ({name, value}: { name: string, value: number }) => {
    return <div>
        <p className={'text-tiny'}>{name}</p>
        <p className={'font-inter text-[32px] font-bold leading-[30px] tracking-wider text-black'}>
            {value.toString().padStart(2, '0')}
        </p>
    </div>
}

const Colon = () => (
    <span className={'text-large font-normal font-inter leading-[30px] tracking-wider text-red-400'}> : </span>
)

const Timer = ({endTime}: { endTime: Date }) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const {days, hours, minutes, seconds} = useTimer(endTime.getTime())

    return (
        <div>
            {/* TODO: Add animation */}
            <div className={`flex_row items-end gap-3`}>
                <Digit name={t(GLOBAL_LOCALES.days)} value={days}/>
                <Colon/>
                <Digit name={t(GLOBAL_LOCALES.hours)} value={hours}/>
                <Colon/>
                <Digit name={t(GLOBAL_LOCALES.minutes)} value={minutes}/>
                <Colon/>
                <Digit name={t(GLOBAL_LOCALES.seconds)} value={seconds}/>
            </div>
        </div>
    )
}

export default Timer
