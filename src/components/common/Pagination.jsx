import { Pointer } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"


export const Paginationlink = ({currentPage , lastPage , onPageChange}) => {

    const render_page_number = () =>{
        let pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink className="cursor-pointer" isActive={i === currentPage} onClick={() => onPageChange(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pages;
    }

    return (
        <Pagination >
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={(e)=>{
                        e.preventDefault();
                        if(currentPage > 1) onPageChange(currentPage - 1);
                    } } />
                </PaginationItem>
                {render_page_number()}               
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={(e) => {
                        e.preventDefault();
                        if(currentPage < lastPage) onPageChange(currentPage + 1);
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}