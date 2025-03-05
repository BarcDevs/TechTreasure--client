import {Button} from '@/components/ui/button'
import {Grid3X3, List} from 'lucide-react'
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {FC} from 'react'

type Props = {
    viewMode: 'grid' | 'list'
    setViewMode: (viewMode: 'grid' | 'list') => void
}

export const SortAndViewControls: FC<Props> = ({viewMode, setViewMode}) => (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full items-center justify-between gap-4 sm:ml-auto sm:w-auto">
            <div className="flex items-center gap-2">
                <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className="size-8"
                    onClick={() => setViewMode('grid')}
                >
                    <Grid3X3 className="size-4"/>
                    <span className="sr-only">
                        Grid view
                    </span>
                </Button>
                <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className="size-8"
                    onClick={() => setViewMode('list')}
                >
                    <List className="size-4"/>
                    <span className="sr-only">
                        List view
                    </span>
                </Button>
                {/*<Select defaultValue="featured">*/}
                {/*    <SelectTrigger className="h-8 w-[130px]">*/}
                {/*        <SelectValue placeholder="Sort by"/>*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent>*/}
                {/*        <SelectItem value="featured">Featured</SelectItem>*/}
                {/*        <SelectItem value="newest">Newest</SelectItem>*/}
                {/*        <SelectItem value="price-low">Price: Low to High</SelectItem>*/}
                {/*        <SelectItem value="price-high">Price: High to Low</SelectItem>*/}
                {/*        <SelectItem value="rating">Top Rated</SelectItem>*/}
                {/*    </SelectContent>*/}
                {/*</Select>*/}
            </div>
        </div>
    </div>
)
