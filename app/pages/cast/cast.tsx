/* SCSS */
import './style.scss';

/* Components */
import Header from '~/components/Header/Header';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { CastScreenProps } from '~/interfaces/Cast.interface';
import { createDefaultCastDetails } from '~/constants/defaults/cast';

/* React */
import { useState, useEffect } from 'react';

/* libs */
import type { CastDetails } from '~/types/cast';



export const CastScreen: React.FC<CastScreenProps> = ({ id }) => {

    const [details, setDetails] = useState<CastDetails>(createDefaultCastDetails());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchResults = async () => {
            try {
                const data: CastDetails = await api.getCast(Number(id));
                console.log(data);
                if (data) {
                    setDetails(data.details);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchResults();
    }, []);


    if (loading) return <p>Loading...</p>;

    const castList = details.credits.cast ?? [];
    const normalizedMovies = [...castList]
        .sort((a: any, b: any) => a.order - b.order)
        .map(credit => ({
            id: credit.id,
            title: credit.title || credit.original_name,
            subtitle: credit.character ?? '',
            image: credit.backdrop_path ? `https://image.tmdb.org/t/p/w500${credit.backdrop_path}` : '',
            linkTo: `/details/${credit.media_type}/${credit.id}`,
            type: credit.media_type,
            release_date: credit.release_date || credit.first_credit_air_date
        }));
    return (
        <main id="cast-details">
            <Header title={details.name}
                tagline={details.biography}
                backgroundImage={details.background}
                trackstripItems={normalizedMovies}
                className="movie">
            </Header>
        </main>

    );
};
