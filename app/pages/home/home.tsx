
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from 'app/components/LinesBG/LinesBG';

/* Services */
import api from '../../services/api';

/* React */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Main() {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('movie'); // default to 'movie'
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!query.trim()) return;
        navigate(`/search/${type}/${encodeURIComponent(query)}/1`);
    };

    return (
        <main>
            <div className="searching">
                <img src="/img/mpw.png" />
                <div className="search">
                    <form onSubmit={handleSubmit}>
                        <input type="search" placeholder="Scour for films and series, then embark on an adventure!"
                            required value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Go</button>
                    </form>
                    <div className="radios">
                        <div className="radio">
                            <input type="radio" name="search" value="movie" checked={type === 'movie'} onChange={() => setType('movie')} />
                            <label>Movies</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="search" value="tv" checked={type === 'tv'}
                                onChange={() => setType('tv')} />
                            <label>TV Series</label>
                        </div>
                    </div>
                </div>
            </div>
            <LinesBG />
        </main>
    );
}