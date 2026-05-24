import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"

export const FilterInquiryPage = ({showFilters , searchTerm, setSearchTerm, statusFilter, setStatusFilter}) => {
    return (
        <>
            {showFilters && (
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">
                    <div className="relative min-w-0 flex-1 lg:w-72 lg:flex-none">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inquiries..."
                            className="w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-44">
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
