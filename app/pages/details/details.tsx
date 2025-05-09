/* SCSS */
import './style.scss'

/* Components */


/* Services */
import api from '~/services/api';

/* Interfaces */
import type { DetailScreenProps, MediaDetail } from '~/interfaces/MediaDetail.interface';
import { createDefaultMediaDetail } from '~/interfaces/defaults';

/* React */
import { useState, useEffect } from 'react';

export const DetailScreen: React.FC<DetailScreenProps> = ({ type, id }) => {

    const [details, setDetails] = useState<MediaDetail>(createDefaultMediaDetail());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data: MediaDetail = await api.getDetails(type, id);

                if (data) {
                    setDetails(data.details);
                    console.log(data.details);
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
        <main>
            <section>
                <div id="header" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                }}>
                    <div className="detail">
                        <h1>{details.title || details.original_name}</h1>
                        <h2>{details.tagline}</h2>
                        <div className="info">
                            <div className="genres">
                                <span className="genre">
                                    {details.genres?.length ? details.genres.map((genre) => genre.name).join(', ') : 'No genres available'}
                                </span>
                            </div>
                        </div>
                    </div>
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
                                            src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                                            alt={season.name}
                                        />
                                    )
                                ))}
                            </div>
                        )}




                        {/* <cast>
                            <actor v-for="actor of cast">
                                <p>{{ actor.name }}</p>
                                <photo>
                                    <img v-if="actor.profile_path"
                                :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`" />
                                    <img v-if="!actor.profile_path" src="@/assets/img/default-photo-actor.png" />
                                </photo>
                            </actor>
                        </cast>
                        <trailers>
                            <trailer v-for="trailer of movie?.videos.results">
                                <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${trailer.key}`"
                                frameborder="0" allowfullscreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </trailer>
                    </trailers> */}
                    </aside>

                    <div id="info">
                        <h1>Information</h1>


                    </div>
                </div>
            </section>
        </main >
    );
};
