import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel'
import PromoBanner from '@/components/home/HeroSlider.tsx'
import heroSlides from '@/constants/heroSlides.ts'

const Hero = ({}) => (
    <section className={'size-full'}>
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                        <PromoBanner
                            slides={heroSlides}
                        />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
)

export default Hero
