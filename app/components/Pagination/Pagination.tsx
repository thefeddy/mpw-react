import './Pagination.scss';

import { useParams, NavLink } from 'react-router';
import { generatePageRange } from '~/utils/pagination';



interface PaginationData {
    pages: number;
    current: number;
    results: number;
}

interface PaginationControlProps {
    pagination: PaginationData;
    itemsPerPage?: number
}

export function PaginationControl({ pagination, itemsPerPage = 20 }: PaginationControlProps) {
    const { type, query } = useParams();



    const { pages: totalPages, current: currentPage, results: totalResults } = pagination;
    const pageNumber = parseInt(String(pagination.current), 10) || 1;

    const visiblePages = generatePageRange(currentPage, totalPages);
    const startItem = pagination.results === 0 ? 0 : (pageNumber - 1) * itemsPerPage + 1;

    const endItem = Math.min(pageNumber * itemsPerPage, pagination.results);

    if (totalPages <= 1) return null;
    return (
        <div className="retro-pagination-wrapper">
            <p className="retro-results">
                Showing {startItem}–{endItem} of {pagination.results.toLocaleString()} entries
            </p>
            <div className="retro-pagination" aria-label="Search results pagination">
                <NavLink
                    to={`/search/${type}/${query}/${Math.max(1, currentPage - 1)}`}
                    className={`nav-arrow ${currentPage === 1 ? '--disabled' : ''}`}
                >
                    &laquo; PREV
                </NavLink>

                <div className="page-numbers">
                    {visiblePages.map((item, idx) => {
                        if (item === '...') {
                            return <span key={`dots-${idx}`} className="pagination-dots">&hellip;</span>;
                        }

                        return (
                            <NavLink
                                key={`page-${item}`}
                                to={`/search/${type}/${query}/${item}`}
                                className={({ isActive }) => `page-link ${isActive ? '--active' : ''}`}
                            >
                                {item}
                            </NavLink>
                        );
                    })}
                </div>

                <NavLink
                    to={`/search/${type}/${query}/${Math.min(totalPages, currentPage + 1)}`}
                    className={`nav-arrow ${currentPage === totalPages ? '--disabled' : ''}`}
                >
                    NEXT &raquo;
                </NavLink>
            </div>
        </div>
    );
}