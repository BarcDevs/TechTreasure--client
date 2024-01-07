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
        <div className="flex h-fit w-full items-center justify-around bg-black py-3">
            <div className={'w-[100px] max-md:hidden'}/>
            <div className="flex items-center justify-center gap-2">
                <div
                    className="h-fit w-fit font-poppins text-sm font-normal leading-[21px] text-neutral-50">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </div>
                <Link to={'/'}
                    className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline max-md:hidden">ShopNow
                </Link>
            </div>

            <div className="flex w-[100px] items-center justify-center gap-[5px]">
                <Select onValueChange={handleSelectLanguage}>
                    <SelectTrigger
                        className={'no-focus inline-flex h-[18px] border-none bg-black font-poppins text-sm font-normal leading-[21px] text-neutral-50 max-md:hidden'}>
                        <span>{language}</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(Languages).map(lang => (
                            <SelectItem className={'cursor-pointer hover:bg-neutral-50'} key={lang}
                                        value={lang}>{lang}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Link to={'/'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline md:hidden">ShopNow
                </Link>

            </div>
        </div>
    )
}


export default Top
