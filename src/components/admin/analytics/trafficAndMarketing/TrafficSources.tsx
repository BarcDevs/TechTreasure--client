import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Globe, ArrowUp, ArrowDown } from 'lucide-react';
import { formatPercentage } from '@/lib/utils/format';
import {useLoaderData} from 'react-router-dom'

const TrafficSources = () => {
    const {trafficSources} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Globe className="mr-2 size-4 text-gray-400" />
                                    <span className="font-medium">{source.source}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2 font-medium">{source.percentage}%</span>
                                    <span
                                        className={`flex items-center text-xs ${
                                            source.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                        }`}
                                    >
                    {source.trend === 'up' ? (
                        <ArrowUp className="mr-1 size-3" />
                    ) : (
                        <ArrowDown className="mr-1 size-3" />
                    )}
                                        {formatPercentage(source.change)}
                  </span>
                                </div>
                            </div>
                            <Progress value={source.percentage} className="mt-1 h-1.5" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TrafficSources;
