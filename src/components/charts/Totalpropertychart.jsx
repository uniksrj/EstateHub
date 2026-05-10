import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Cell, Label, LabelList, Pie, PieChart } from "recharts"
import { PropertyStatusLegend } from "../common/PropertyStatus"

const propertyStatusConfig = {
    Available: { label: "Available", color: "#3b82f6" },
    Sold: { label: "Sold", color: "#10b981" },
    Rented: { label: "Rented", color: "#f59e0b" },
    Maintenance: { label: "Maintenance", color: "#ef4444" },
    Pending: { label: "Pending", color: "#8b5cf6" },
}

const activeinactive = {
    Available: { label: "active", color: "#10b981" },
    Sold: { label: "inactive", color: "#ff0000ff" },
}

export const Totalpropertychart = ({ propertyStatusData }) => {
    const totalVisitors = useMemo(() => {
        return propertyStatusData.reduce((acc, curr) => acc + curr.count, 0)
    }, [])
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Property Status Overview</CardTitle>
                    <CardDescription>Current portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={propertyStatusConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={propertyStatusData}
                                dataKey="count"
                                nameKey="status"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                {propertyStatusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-center"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold "
                                                    >
                                                        {totalVisitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Properties
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                    <PropertyStatusLegend data={propertyStatusData} />
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        Total properties: {propertyStatusData.reduce((sum, item) => sum + item.count, 0)}
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Status breakdown: Available, Sold, Rented, Maintenance, Pending
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export const Totalactiveinactivechart = ({ activeInactiveData }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Active vs Inactive Users</CardTitle>
                    <CardDescription>Overview for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={activeinactive}
                        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey="label" hideLabel />}
                            />
                            <Pie data={activeInactiveData} dataKey="count" nameKey="label" strokeWidth={5}>
                                <LabelList
                                    dataKey="browser"
                                    className="fill-background"
                                    stroke="none"
                                    fontSize={12}
                                    formatter={(value) =>
                                        activeinactive[value]?.label
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">                   
                    <div className="text-muted-foreground leading-none">
                        Showing total active and inactive users
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}