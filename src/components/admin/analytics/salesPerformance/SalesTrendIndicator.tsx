import {cn} from '@/lib/utils'
import {TrendingDown, TrendingUp} from 'lucide-react'
import {FC} from 'react'

type Props = {
    trend: 'up' | 'down'
    change: number
}

const SalesTrendIndicator: FC<Props> = ({trend, change}) =>
    (
        <div className="mt-6 flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2 text-xl font-semibold">
                        <span
                            className={cn(
                                'flex items-center gap-1 text-sm font-medium',
                                trend === 'up'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            )}
                        >
              {trend === 'up' ? (
                  <TrendingUp size={16}/>
              ) : (
                  <TrendingDown size={16}/>
              )}
                            {change}%
            </span>
            </div>
        </div>
    )

export default SalesTrendIndicator
