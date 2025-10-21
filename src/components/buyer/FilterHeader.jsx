import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export const FilterHeader = ({filters}) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <p className="text-muted-foreground">
                    {filters.search && `Search: "${filters.search}"`}
                    {filters.propertyType !== 'all' && ` • ${filters.propertyType}`}
                    {filters.city !== 'all' && ` • ${filters.city}`}
                </p>
            </div>
            <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}