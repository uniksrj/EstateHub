// components/DeadDealAnalysis.jsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import DeadDealChart from './DeadDealChart';
import DealLossReasons from './DealLossReasons';
import DeadDealTable from './DeadDealTable';
import DealRecoveryRate from './DealRecoveryRate';

const DeadDealAnalysis = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dead Deal Analysis</h1>
                <p className="text-muted-foreground">
                    Analyze patterns and reasons behind lost deals to improve future performance
                </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
                    <TabsTrigger value="details">Deal Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Dead Deals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">142</div>
                                <p className="text-xs text-muted-foreground">
                                    +12% from last quarter
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Value Lost</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$42.8M</div>
                                <p className="text-xs text-muted-foreground">
                                    -5% from last quarter
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$301K</div>
                                <p className="text-xs text-muted-foreground">
                                    +8% from last quarter
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">18%</div>
                                <p className="text-xs text-muted-foreground">
                                    +3% from last quarter
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Dead Deals Trend</CardTitle>
                                <CardDescription>
                                    Monthly dead deal volume and value over the past year
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DeadDealChart />
                            </CardContent>
                        </Card>


                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Loss Reasons</CardTitle>
                                <CardDescription>
                                    Primary reasons for deal losses
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DealLossReasons />
                            </CardContent>
                        </Card>

                         <Card>
                            <CardHeader>
                                <CardTitle>Recovery Rate by Type</CardTitle>
                                <CardDescription>
                                    Percentage of deals recovered after being marked dead
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DealRecoveryRate />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">                       

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Dead Deals</CardTitle>
                                <CardDescription>
                                    Latest deals that have been marked as dead
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DeadDealTable />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="trends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trend Analysis</CardTitle>
                            <CardDescription>
                                Detailed analysis of dead deal patterns and trends
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Advanced trend analysis features will be implemented here.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dead Deal Details</CardTitle>
                            <CardDescription>
                                Comprehensive view of all dead deals with filtering options
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Detailed table with filtering and export capabilities will be implemented here.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DeadDealAnalysis;