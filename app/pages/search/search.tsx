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
import { Link } from 'react-router-dom';


export const SearchScreen: React.FC<SearchScreenProps> = ({ type, query, page }) => {
    const pageNumber = parseInt(page, 10) || 1;
    const [results, setResults] = useState<Item[]>([]);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.searchTV(type, query, pageNumber);
                if (data && data.results) {
                    setResults(data.results.results);
                    setTotalResults(data.results.total_results);
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
            <section>
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
                    {/* Optional: Implement pagination buttons here */}
                </div>
            </section>
        </main>
    );
}
