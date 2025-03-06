import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel'
import HeroSlider from '@/components/home/HeroSlider.tsx'

// const MockItem = ({}) => (
//     <div className={'inline-flex size-full justify-center bg-black'}>
//         <img src="/assets/images/hero.svg" alt="hero" className={'max-lg:hidden'}/>
//         <img src="/assets/images/hero-sm.svg" alt="hero" className={'lg:hidden'}/>
//     </div>
// )

const Hero = ({}) => (
    <section className={'size-full'}>
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    {/*<MockItem/>*/}
                    <HeroSlider/>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
)

export default Hero
