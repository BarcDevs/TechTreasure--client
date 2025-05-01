import { useState, useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { HeroSlide } from '@/types'
import Icon from '@/components/elements/Icon.tsx'
import {Link} from 'react-router-dom'

type PromoBannerProps = {
    slides: HeroSlide[]
    totalSlides?: number
    defaultActiveSlide?: number
}

const PromoBanner = ({
                         slides,
                         totalSlides = 5,
                         defaultActiveSlide = 3
                     }: PromoBannerProps) => {
    const [activeSlide, setActiveSlide] = useState(defaultActiveSlide)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const [dragDistance, setDragDistance] = useState(0)
    const slideContainerRef = useRef<HTMLDivElement>(null)

    // Minimum distance required for swipe/drag
    const minSwipeDistance = 50

    const handleSlideChange = (index: number) => {
        if (index < 0) {
            setActiveSlide(0)
        } else if (index >= slides.length) {
            setActiveSlide(slides.length - 1)
        } else {
            setActiveSlide(index)
        }
    }

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
        setTouchEnd(null)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            handleSlideChange(activeSlide + 1)
        }

        if (isRightSwipe) {
            handleSlideChange(activeSlide - 1)
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

    // Mouse drag handlers for desktop
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDragging(true)
        setDragStartX(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return

        const currentDragDistance = e.clientX - dragStartX
        setDragDistance(currentDragDistance)

        // Optional: Add visual feedback during dragging
        if (slideContainerRef.current) {
            // Limit the drag distance to avoid excessive movement
            const limitedDrag = Math.max(
                Math.min(currentDragDistance, 100),
                -100
            )
            slideContainerRef.current.style.transform = `translateX(${limitedDrag}px)`
        }
    }

    const handleMouseUp = () => {
        if (!isDragging) return

        if (dragDistance > minSwipeDistance) {
            handleSlideChange(activeSlide - 1)
        } else if (dragDistance < -minSwipeDistance) {
            handleSlideChange(activeSlide + 1)
        }

        // Reset drag state
        setIsDragging(false)
        setDragDistance(0)

        // Reset any transform applied during dragging
        if (slideContainerRef.current) {
            slideContainerRef.current.style.transform = ''
        }
    }

    // Handle clicks outside of the component to end dragging
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                handleMouseUp()
            }
        }

        window.addEventListener('mouseup', handleGlobalMouseUp)
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp)
        }
    }, [isDragging])

    // Clean up transform styles when slide changes
    useEffect(() => {
        if (slideContainerRef.current) {
            slideContainerRef.current.style.transform = ''
        }
    }, [activeSlide])

    return (
        <div
            className="relative flex h-80 w-full items-center justify-between overflow-hidden bg-black p-6 text-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={slideContainerRef}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
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
                        <Link to={slides[activeSlide].link}>
                            {'Shop Now'}
                        </Link>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Right side image */}
            <div className="absolute right-0 top-0 h-full w-1/2">
                <img
                    src={slides[activeSlide].image}
                    alt="phone image"
                    className="size-full object-contain"
                    draggable={false}
                />
            </div>

            {/* Bottom pagination dots */}
            <div className="absolute bottom-4 left-0 flex w-full justify-center space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
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
