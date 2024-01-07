import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select"
import {useState} from 'react'
import {Languages} from '@/constants'
import {Link} from 'react-router-dom'


const Top = ({}) => {
    const [language, setLanguage] = useState(Languages.ENG)

    const handleSelectLanguage = (lang: string) => {
        setLanguage(lang as Languages)
    }
    return (
        <div className="w-full h-12 py-3 bg-black justify-around items-center flex">
            <div className={'w-[100px]'}/>
            <div className="justify-center items-center gap-2 flex">
                <div
                    className="w-fit h-[18px] text-neutral-50 text-sm font-normal font-poppins leading-[21px]">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </div>
                <Link to={'/'}
                    className="text-center text-neutral-50 text-sm font-semibold font-poppins underline leading-normal">ShopNow
                </Link>
            </div>

            <div className="justify-center items-center gap-[5px] flex w-[100px]">
                <Select onValueChange={handleSelectLanguage}>
                    <SelectTrigger
                        className={'h-[18px] bg-black inline-flex text-neutral-50 text-sm font-normal font-poppins leading-[21px] border-none no-focus'}>
                        <span>{language}</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(Languages).map(lang => (
                            <SelectItem className={'hover:bg-neutral-50 cursor-pointer'} key={lang}
                                        value={lang}>{lang}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}


export default Top
