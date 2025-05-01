import {useState} from 'react'
import {ArrowRight} from 'lucide-react'
import {HeroSlide} from '@/types'
import Icon from '@/components/elements/Icon.tsx'

type PromoBannerProps = {
    slides: HeroSlide[],
    totalSlides?: number,
    defaultActiveSlide?: number
}

const PromoBanner = ({
                         slides,
                         totalSlides = 5,
                         defaultActiveSlide = 3
                     }: PromoBannerProps) => {
    const [activeSlide, setActiveSlide] = useState(defaultActiveSlide)

    const handleSlideChange = (index: number) => {
        setActiveSlide(index)
    }

    return (
        <div className="relative flex h-80 w-full items-center justify-between overflow-hidden bg-black p-6 text-white">
            {/* Left side content */}
            <div className="z-10 flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                    <div className="size-6">
                        <Icon
                            name={'logo'}
                            path={slides[activeSlide].brand}
                            size={30}
                        />
                    </div>
                    <span className="text-sm font-medium">{slides[activeSlide].title}</span>
                </div>

                <div className="space-y-1">
                    <h2 className="text-4xl font-bold">
                        {slides[activeSlide].offer}
                    </h2>

                    <button className="flex items-center space-x-2 border-b border-white pb-1 pt-6 text-sm font-medium">
                        <span>{'Shop Now'}</span>
                        <ArrowRight size={16}/>
                    </button>
                </div>
            </div>

            {/* Right side image */}
            <div className="absolute right-0 top-0 h-full w-1/2">
                <img
                    src={slides[activeSlide].image}
                    alt="phone image"
                    className="size-full object-contain"
                />
            </div>

            {/* Bottom pagination dots */}
            <div className="absolute bottom-4 left-0 flex w-full justify-center space-x-2">
                {Array.from({length: totalSlides}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`size-2 rounded-full ${
                            activeSlide === index ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default PromoBanner
