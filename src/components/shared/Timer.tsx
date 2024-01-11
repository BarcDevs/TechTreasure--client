import useTimer from '@/hooks/useTimer.ts'

const Digit = ({name, value}: { name: string, value: number }) => {
    return <div>
        <p className={'text-tiny'}>{name}</p>
        <p className={'text-black text-[32px] font-bold font-inter leading-[30px] tracking-wider'}>
            {value.toString().padStart(2, '0')}
        </p>
    </div>
}

const Colon = () => (
    <span className={'text-red-400 text-large font-regular font-inter leading-[30px] tracking-wider'}> : </span>
)

const Timer = ({endTime}: { endTime: Date }) => {
    const {days, hours, minutes, seconds} = useTimer(endTime.getTime())

    return (
        <div>
            {/* TODO: Add animation */}
            <div className={`flex_row items-end gap-3`}>
                <Digit name={'Days'} value={days}/>
                <Colon/>
                <Digit name={'Hours'} value={hours}/>
                <Colon/>
                <Digit name={'Minutes'} value={minutes}/>
                <Colon/>
                <Digit name={'Seconds'} value={seconds}/>
            </div>
        </div>
    )
}

export default Timer
