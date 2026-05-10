import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"

export const FilterInquiryPage = ({showFilters , searchTerm, setSearchTerm, statusFilter, setStatusFilter}) => {
    return (
        <>
            {showFilters && (
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inquiries..."
                            className="pl-10 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Inquiries</SelectItem>
                            <SelectItem value="0">New</SelectItem>
                            <SelectItem value="1">Responded</SelectItem>
                            <SelectItem value="2">Contacted</SelectItem>
                            <SelectItem value="3">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </>
    )
}