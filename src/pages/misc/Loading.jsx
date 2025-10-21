import { Card, CardContent } from "@/components/ui/card";

export const Loading = ({ loading }) => {
    if (!loading) return null;
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
                <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                        <div className="h-48 bg-muted"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

    )
}