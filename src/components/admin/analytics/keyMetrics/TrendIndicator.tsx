import {ArrowDown, ArrowUp} from 'lucide-react'

const TrendIndicator = ({trend, change}: { trend: 'up' | 'down', change: number }) =>
    (
        <span className={`flex items-center text-xs ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
      {trend === 'up' ? (
          <ArrowUp className="mr-1 size-3"/>
      ) : (
          <ArrowDown className="mr-1 size-3"/>
      )}
            {change}%
    </span>
    )

export default TrendIndicator
