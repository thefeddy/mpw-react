/* SCSS */
import './search.scss'

/* Components */
import LinesBG from 'app/components/LinesBG/LinesBG';

/* Services */
import api from '../../services/api';

/* React */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function SearchScreen() {
    const { type, query, page } = useParams() as { type: string; query: string; page: string };
    const pageNumber = parseInt(page, 10);
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(type, query, page);

        const fetchResults = async () => {
            try {
                const data = await api.searchTV(type, query, pageNumber);
                if (data && data.results) {
                    setResults(data.results.results);
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
            <div className="results">
                {results.length > 0 ? (
                    results.map((item, index) => (
                        <div key={index} className="result-item">
                            {item?.name || item?.title}
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </main>
    );
}
