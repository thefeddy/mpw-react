/* SCSS */
import './style.scss'

/* Components */
import RenderStreamList from './components/RenderStreamList';
import Header from '~/components/Header/Header';
/* Services */
import api from '~/services/api';

/* Interfaces */
import type { DetailScreenProps, MediaDetail } from '~/interfaces/MediaDetail.interface';
import type { StreamBuyRent } from '~/interfaces/StreamBuyRent.inteface';
import { createDefaultMediaDetail } from '~/interfaces/defaults';

/* React */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <Header data={details} type="cast" />

            <section id="details">
                <h1>Information</h1>
                <p>{details.overview}</p>

                {details.seasons?.length > 0 && (
                    <div className="episodes">
                        {details.seasons.map((season) => (
                            season.poster_path && (
                                <Link to={`/season/${id}/${season.season_number}`} key={season.id}>
                                    <img
                                        key={season.id}
                                        src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                                        alt={season.name}
                                    />
                                </Link>
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

                <aside>
                    <a href={`https://www.imdb.com/title/${details.imdb_id}`} target="_blank" rel="noopener noreferrer">
                        IMDb Link
                    </a>
                    <br />
                    <ul>
                        <li>Status : {details.status}</li>
                        <li>Runtime : {details.runtime} Minutes</li>
                    </ul>
                    {details.streams?.rent?.length > 0 || details.streams?.buy?.length > 0 && (<h1>Streams</h1>)}
                    {details.streams?.rent?.length > 0 && (<RenderStreamList label="Rent" streams={details.streams?.rent} />)}
                    {details.streams?.buy?.length > 0 && (<RenderStreamList label="Buy" streams={details.streams?.buy} />)}
                </aside>

            </section >
        </main >
    );
};
