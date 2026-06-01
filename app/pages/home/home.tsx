
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from 'app/components/LinesBG/LinesBG';

/* Services */
import api from '../../services/api';

/* React */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Main() {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('movie');
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!query.trim()) return;
        navigate(`/search/${type}/${encodeURIComponent(query)}/1`);
    };

    return (
        <main className="console-page-layout">
            <div className="console-layout-wrapper">

                <header className="console-masthead">
                    <h1 className="console-masthead__title">
                        <span className="console-masthead__badge">Welcome To</span>
                        <span className="console-masthead__main-text">The Theatre</span>
                    </h1>
                    <div className="console-masthead__divider">
                        <span className="console-masthead__dot"></span>
                        <span className="console-masthead__line"></span>
                        <span className="console-masthead__dot"></span>
                    </div>
                </header>

                <div className="console-deck">
                    <form autoComplete="off" noValidate onSubmit={handleSubmit} className="console-form">
                        <div className="console-input-group">
                            <input
                                type="search"
                                placeholder="Scour for films and series, then embark on an adventure!"
                                required
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="console-input"
                            />
                            <button type="submit" className="console-submit-btn">Go</button>
                        </div>

                        <div className="console-toggles">
                            <label className={`console-toggle-card ${type === 'movie' ? '--active' : ''}`}>
                                <input
                                    type="radio"
                                    name="search"
                                    value="movie"
                                    checked={type === 'movie'}
                                    onChange={() => setType('movie')}
                                    className="visual-hidden"
                                />
                                <span className="console-toggle-card__indicator"></span>
                                <span className="console-toggle-card__label">Movies</span>
                            </label>

                            <label className={`console-toggle-card ${type === 'tv' ? '--active' : ''}`}>
                                <input
                                    type="radio"
                                    name="search"
                                    value="tv"
                                    checked={type === 'tv'}
                                    onChange={() => setType('tv')}
                                    className="visual-hidden"
                                />
                                <span className="console-toggle-card__indicator"></span>
                                <span className="console-toggle-card__label">TV Series</span>
                            </label>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
}