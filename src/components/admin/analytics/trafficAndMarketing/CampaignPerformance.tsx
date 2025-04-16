import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare } from 'lucide-react';
import {useLoaderData} from 'react-router-dom'

const CampaignPerformance = ({  }) => {
    const {campaignPerformance} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {campaignPerformance.map((campaign, index) => (
                        <div key={index}>
                            <div className="mb-2 flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{campaign.name}</div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        {campaign.type === 'email' ? (
                                            <Mail className="mr-1 size-3" />
                                        ) : (
                                            <MessageSquare className="mr-1 size-3" />
                                        )}
                                        {campaign.type === 'email' ? 'Email Campaign' : 'SMS Campaign'}
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                    {((campaign.converted / campaign.sent) * 100).toFixed(1)}% conversion
                                </Badge>
                            </div>

                            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">
                                        {campaign.sent.toLocaleString()}
                                    </div>
                                    <div className="text-gray-500">
                                        Sent
                                    </div>
                                </div>
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">
                                        {campaign.opened.toLocaleString()}
                                    </div>
                                    <div className="text-gray-500">
                                        Opened
                                    </div>
                                </div>
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">
                                        {campaign.clicked.toLocaleString()}
                                    </div>
                                    <div className="text-gray-500">
                                        Clicked
                                    </div>
                                </div>
                                <div className="rounded-md bg-gray-50 p-2">
                                    <div className="font-medium">{campaign.converted.toLocaleString()}</div>
                                    <div className="text-gray-500">Converted</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CampaignPerformance;
