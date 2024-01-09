import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel"

const MockItem = ({}) => (
    <div className={'inline-flex h-full w-full justify-center bg-black'}>
        {/*//     <div className={'h-full w-[50%]'}></div>*/}
        {/*//     <div className={'w-[50%]'}>*/}
        {/*//         <img src="/assets/images/hero-image-iphone.jpeg" alt="phone" className={'z-0 bg-clip-content pt-4'}/>*/}
        {/*//     </div>*/}
        <img src="/assets/images/hero.svg" alt="hero" className={'max-lg:hidden'}/>
        <img src="/assets/images/hero-sm.svg" alt="hero" className={'lg:hidden'}/>
    </div>
)

const Hero = ({}) => (
    <section className={'h-full w-full'}>
        <Carousel>
            <CarouselContent>
                <CarouselItem><MockItem/></CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
)


export default Hero
