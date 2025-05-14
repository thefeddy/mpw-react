
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';
import Poster from '~/components/Poster/Poster';


/* Services */
import api from '../../services/api';

/* Interfaces */
import type { Item } from '~/interfaces/SearchScreen.interface';

/* React */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function TrendingScreen() {
    const [results, setResults] = useState<Item[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.getTrending();
                if (data && data.results) {

                    setResults(data.results);

                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, []);
    return (
        <main>
            <section id="results" className="trending">
                <div className="list">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <Link key={item.id} to={`/details/movie/${item.id}`}>
                                <Poster data={item} />
                            </Link>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </section>
        </main>
    );
}