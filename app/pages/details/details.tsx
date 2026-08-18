/* SCSS */
import './style.scss'

/* Components */
import RenderStreamList from './components/RenderStreamList';
import Header from '~/components/Header/Header';
import GenreBadges from '~/components/GenreBadges/GenreBadges';
import TrackStrip from '~/components/TrackStrip/TrackStrip';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { DetailScreenProps } from '~/types/media';

import type { TrackstripItem } from '~/components/Header/interfaces/TrackstripItem';

/* React */
import { useState, useEffect } from 'react';
import { data, Link } from 'react-router-dom';

/* Zod */
import { type DetailsResponse, } from '~/schemas/media.schema';


export const DetailScreen: React.FC<DetailScreenProps> = ({ type, id, onDataLoaded }) => {

    const [details, setDetails] = useState<DetailsResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.getDetails(type, id);
                console.log(data)
                if (data) {
                    const mediaTitle = data.title || data.original_name;
                    console.log(type)
                    data.type = 'tv';

                    setDetails(data);
                    onDataLoaded(mediaTitle);

                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [type, id]);

    const castList = details?.credits?.cast ?? [];
    const seasonsList = details?.seasons ?? [];
    const normalizedCast = [...castList]
        .sort((a: any, b: any) => a.order - b.order)
        .map(actor => ({
            id: actor.id,
            title: actor.name,
            subtitle: actor.character ?? '',
            image: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '',
            linkTo: `/cast/${actor.id}`
        }));

    const normalizedSeasons = [...seasonsList]
        .sort((a: any, b: any) => a.order - b.order)
        .map(season => ({
            id: season.id,
            title: season.name,
            subtitle: season.episode_count ?? '',
            image: season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : '',
            linkTo: `/tv/${id}/season/${season.id}`,
            type: 'season'
        }));
    if (loading) return <p>Loading...</p>;


    return (
        <main id="media-details">
            <Header title={details.title || details.name}
                tagline={details.tagline}
                backgroundImage={details.background}
                trackstripItems={normalizedCast}
                className="movie">
                <GenreBadges genres={details.genres} />
            </Header>
            {type === 'tv' && (
                <TrackStrip>
                    {normalizedSeasons.map((item: TrackstripItem, index: number) => (
                        <div
                            key={index}
                            className={`track ${!item.image ? 'default-background' : ''}`}
                            style={item.image ? { backgroundImage: `url(${item.image})` } : {}}
                        >
                            <Link to={item.linkTo}>
                                <div className="details">
                                    <p>{item.title}</p>
                                    <span>Episodes: {item.subtitle}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </TrackStrip>
            )}
        </main>
    );
};
