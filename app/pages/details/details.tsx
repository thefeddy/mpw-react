/* SCSS */
import './style.scss'

/* Components */


/* Services */
import api from '~/services/api';

/* Interfaces */
import type { DetailScreenProps, MediaDetail } from '~/interfaces/MediaDetail.interface';
import type { StreamBuyRent } from '~/interfaces/StreamBuyRent.inteface';
import { createDefaultMediaDetail } from '~/interfaces/defaults';

/* Utils */
import { getGenreColors } from '~/utils/genres';

/* React */
import { useState, useEffect } from 'react';


export const DetailScreen: React.FC<DetailScreenProps> = ({ type, id }) => {

    const [details, setDetails] = useState<MediaDetail>(createDefaultMediaDetail());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data: MediaDetail = await api.getDetails(type, id);
                if (data && data.details) {
                    console.log(data.details)
                    setDetails(data.details);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [type, id]);



    if (loading) return <p>Loading...</p>;
    // do some fancy loading thingy frames or maybe not worry about the backdrop throwing a 404 until it's fully loaded?

    return (
        <main id="media-details">
            <section className="showcase">
                <div id="header" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path ?? details.background})`,
                }}>
                    <div className="detail">
                        <h1>{details.title || details.original_name}</h1>
                        <h2>{details.tagline}</h2>
                        {details.genres?.length > 0 && (
                            <div className="info">
                                <span className="genres">
                                    {details.genres.map((genre, index) => {
                                        const colors = getGenreColors(genre.name);
                                        return (
                                            <span
                                                key={index}
                                                className="genre"
                                                style={{
                                                    backgroundColor: colors.primary,
                                                    boxShadow: `2px 2px 6px ${colors.accent}`,
                                                }}
                                            >
                                                {genre.name}
                                            </span>
                                        );
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                </div>
                <div className="cast">
                    {details.credits?.cast.map((cast) => (
                        <div class="cast-list">
                            <div key={cast.id} className="actor" style={cast.profile_path ? {
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${cast.profile_path})`
                            } : {}}>
                                <div className="details">
                                    <p>{cast.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="details">
                <div className="container">
                    <aside>
                        {details.seasons?.length > 0 && (
                            <div className="episodes">
                                {details.seasons.map((season) => (
                                    season.poster_path && (
                                        <img
                                            key={season.id}
                                            src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                                            alt={season.name}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                        <div className="trailers">
                            {details.trailers?.youtube
                                .filter((trailer) => trailer.type === 'Trailer')
                                .map((trailer) => (
                                    <div className="trailer" key={trailer.source}>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer.source}`}></iframe>
                                    </div>
                                ))}
                        </div>
                    </aside>
                    {/* Need to design this */}
                    <div id="info">
                        <h1>Information</h1>
                        <p>{details.overview}</p>
                        <br />
                        <a href={`https://www.imdb.com/title/${details.imdb_id}`} target="_blank" rel="noopener noreferrer">
                            IMDb Link
                        </a>
                        <br />
                        <br />
                        <ul>
                            <li>Status : {details.status}</li>
                            <li>Runtime : {details.runtime} Minutes</li>
                        </ul>

                        <h1>Streams</h1>
                        <span>Renting</span>
                        <ul>
                            {details.streams?.rent?.map((rent: StreamBuyRent) => (
                                <li key={`rent-${rent.provider_name}`}><img src={`https://image.tmdb.org/t/p/original/${rent.logo_path}`} /></li>
                            ))}
                        </ul>
                        <span>Buying</span>
                        <ul>
                            {details.streams?.buy?.map((buy: StreamBuyRent) => (
                                <li key={`rent-${buy.provider_name}`}><img src={`https://image.tmdb.org/t/p/original/${buy.logo_path}`} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section >
        </main >
    );
};
