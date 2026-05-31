/* SCSS */
import './style.scss'

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';
import Poster from '~/components/Poster/Poster';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { SearchScreenProps, Item } from '~/interfaces/SearchScreen.interface';

/* React */
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PaginationControl } from '~/components/Pagination/Pagination';
import { SearchHeader } from '~/components/SearchHeader/SearchHeader';


export const SearchScreen: React.FC<SearchScreenProps> = ({ type, query, page }) => {
    const pageNumber = parseInt(page, 10) || 1;
    const ITEMS_PER_PAGE = 20; // TMDB's strict default size

    const [results, setResults] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pages: 0,
        current: 1,
        results: 0
    });

    useEffect(() => {
        const controller = new AbortController();

        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await api.searchTV(type, query, pageNumber);

                if (!controller.signal.aborted && data && data.results) {
                    setResults(data.results);
                    setPagination(data.pagination);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (error) {
                if (!controller.signal.aborted) console.error(error);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        fetchResults();
        return () => controller.abort();
    }, [type, query, pageNumber]);

    return (
        <main>

            <section id="results">
                <SearchHeader query={query} />



                <div className="list">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <Link key={item.id} to={`/details/${type}/${item.id}`}>
                                <Poster data={item} />
                            </Link>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
                {pagination.pages > 1 && (
                    <PaginationControl pagination={pagination} itemsPerPage={ITEMS_PER_PAGE} />
                )}
            </section>
        </main>
    );
}
