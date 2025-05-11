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


export const SearchScreen: React.FC<SearchScreenProps> = ({ type, query, page }) => {
    const pageNumber = parseInt(page, 10) || 1;
    const [results, setResults] = useState<Item[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.searchTV(type, query, pageNumber);
                if (data && data.results) {
                    setResults(data.results.results);
                    setTotalResults(data.results.total_results);
                    setTotalPages(data.results.total_pages)
                    console.log(data.results)
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, [type, query, page]);

    return (
        <main>
            <LinesBG />
            <section id="results">
                <h1>Search results for: <strong>{query}</strong></h1>
                <h2>Total Results: <strong>{totalResults}</strong></h2>

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

                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <NavLink
                            key={index}
                            to={`/search/${type}/${query}/${index + 1}`}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            {index + 1}
                        </NavLink>
                    ))}
                </div>
            </section>
        </main>
    );
}
