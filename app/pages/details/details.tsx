/* SCSS */
import './style.scss'

/* Components */
import RenderStreamList from './components/RenderStreamList';
import Header from '~/components/Header/Header';
import GenreBadges from '~/components/GenreBadges/GenreBadges';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { DetailScreenProps, MediaDetail } from '~/interfaces/MediaDetail.interface';
import type { StreamBuyRent } from '~/interfaces/StreamBuyRent.inteface';
import { createDefaultMediaDetail } from '~/interfaces/defaults';

/* React */
import { useState, useEffect } from 'react';
import { data, Link } from 'react-router-dom';


export const DetailScreen: React.FC<DetailScreenProps> = ({ type, id, onDataLoaded }) => {

    const [details, setDetails] = useState<MediaDetail>(createDefaultMediaDetail());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data: MediaDetail = await api.getDetails(type, id);
                if (data && data.details) {
                    console.log(data.details)
                    setDetails(data.details);
                    const mediaTitle = data.details.title || data.details.original_name;
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

    const normalizedCast = [...castList]
        .sort((a: any, b: any) => a.order - b.order)
        .map(actor => ({
            id: actor.id,
            title: actor.name,
            subtitle: actor.character ?? '',
            image: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '',
            linkTo: `/cast/${actor.id}`
        }));
    if (loading) return <p>Loading...</p>;


    return (
        <main id="media-details">
            <Header title={details.title || details.original_name}
                tagline={details.tagline}
                backgroundImage={details.background}
                asideItems={normalizedCast}
                className="movie">
                <GenreBadges genres={details.genres} />
            </Header>
        </main >
    );
};
