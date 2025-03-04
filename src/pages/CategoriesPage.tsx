import {useState} from 'react'
import {X} from 'lucide-react'
import {Link} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {Sheet, SheetContent} from '@/components/ui/sheet'
import {Categories} from '@/constants/categories.ts'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'

const CategoriesPage = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const {t} = useTranslation(I18N_NAMESPACES.categories)
    // todo: add translations

    return (
        <div className="min-h-screen bg-background">
            <main className="container px-4 py-6 md:px-6 md:py-8 lg:py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Shop by Category</h1>
                    <p className="mt-2 text-muted-foreground">Browse our wide selection of products by category</p>
                </header>

                <section>
                    <h2 className="mb-6 text-2xl font-semibold tracking-tight">All Categories</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {Object.values(Categories)
                            .map((category, index) => (
                                <Link
                                    key={index}
                                    to={`/categories/${category._id}`}
                                    className="group flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary hover:bg-card/50"
                                >
                                    <div className="mb-3 overflow-hidden">
                                        <img
                                            src={category.icon || '/placeholder.svg'}
                                            alt={category.name}
                                            width={100}
                                            height={100}
                                            className="size-[100px] object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-center text-sm font-medium">{t(category.name)}</h3>
                                </Link>
                            ))}
                    </div>
                </section>
            </main>

            {/* Mobile Filters Sheet */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetContent side="left" className="w-[300px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Filters</h3>
                        <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                            <X className="size-5"/>
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                    <div className="mt-6 space-y-6">
                        <div>
                            <h4 className="mb-3 text-sm font-medium">Department</h4>
                            <div className="space-y-2">
                                {['Men', 'Women', 'Kids', 'Home', 'Beauty'].map((dept, i) => (
                                    <div key={i} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`mobile-dept-${i}`}
                                            className="size-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`mobile-dept-${i}`} className="ml-2 text-sm">
                                            {dept}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-medium">Price Range</h4>
                            <div className="space-y-2">
                                {['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', 'Over $200'].map((price, i) => (
                                    <div key={i} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`mobile-price-${i}`}
                                            className="size-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`mobile-price-${i}`} className="ml-2 text-sm">
                                            {price}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-medium">Customer Rating</h4>
                            <div className="space-y-2">
                                {['4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Star & Up'].map((rating, i) => (
                                    <div key={i} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`mobile-rating-${i}`}
                                            className="size-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`mobile-rating-${i}`} className="ml-2 text-sm">
                                            {rating}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Button className="flex-1">Apply</Button>
                        <Button variant="outline" onClick={() => setMobileFiltersOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CategoriesPage
