import {useState, useEffect} from 'react'
import {ArrowRight} from 'lucide-react'
import heroSlides from '@/constants/heroSlides.ts'
import {Link} from 'react-router-dom'

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative h-[450px] w-full overflow-hidden bg-black">
            <div
                className="relative h-full transition-transform duration-500 ease-out"
                style={{transform: `translateX(-${currentSlide * 100}%)`}}
            >
                <div className="absolute flex size-full">
                    {heroSlides.map((slide) => (
                        <div key={slide.id} className="relative size-full shrink-0">
                            <div className="container relative mx-auto h-full px-4">
                                <div className="grid h-full grid-cols-1 items-center lg:grid-cols-2">
                                    {/* Content */}
                                    <div className="z-10 space-y-6">
                                        <img
                                            src={slide.brand || '/placeholder.svg'}
                                            alt="Brand Logo"
                                            width={50}
                                            height={50}
                                            className="brightness-0"
                                        />
                                        <h2 className="text-2xl font-medium text-white md:text-3xl">
                                            {slide.title}
                                        </h2>
                                        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                                            {slide.offer}
                                        </h1>
                                        <Link to={'#'}
                                              className="group inline-flex items-center border-b border-white pb-1 text-white">
                                            <span className="mr-2">
                                                Shop Now
                                            </span>
                                            <ArrowRight
                                                className="size-5 transition-transform group-hover:translate-x-1"/>
                                        </Link>
                                    </div>

                                    {/* Image */}
                                    <div
                                        className="absolute -inset-x-0 right-0 top-1/2 w-[520px] -translate-y-1/2 lg:static lg:translate-y-0">
                                        <img
                                            src={slide.image || '/placeholder.svg'}
                                            alt={slide.title}
                                            width={800}
                                            height={800}
                                            className="object-contain"
                                            // priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`size-2 rounded-full transition-all ${
                            currentSlide === index ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                    >
                        <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
