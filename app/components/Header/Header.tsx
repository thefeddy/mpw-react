/* SCSS */
import './Header.scss'

/* Intefaces */
import type { HeaderProps } from './types';

/* Services */
import api from '~/services/api';

/* Utils */
import { getGenreColors } from '~/utils/genres';

/* React */
import { useEffect, useState, type JSX } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '~/context/UserContext';



export default function Header({ data, type }: HeaderProps): JSX.Element {
    const { token } = useUser();


    // 🏷️ State Management

    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState('');


    const location = useLocation();
    const pathParts = location.pathname.split('/').filter(Boolean); // removes empty strings

    const baseSegment = pathParts[0];
    const tagline =
        typeof data?.tagline === 'string' && data.tagline.trim() !== ''
            ? data.tagline
            : (Array.isArray(data?.members) && data?.created)
                ? `Members: ${data.members.length + 1} | Created: ${data.created}`
                : '';

    const asideData = [
        ...(data.credits?.cast || []),
        ...(data.movies || []),
        ...(data.episodes || [])
    ];

    /* Utils */
    const getDisplayTitle = (data: any): string => {
        return (
            data?.name ||
            data?.details?.title ||
            data?.details?.original_name ||
            data?.title ||
            ''
        );
    };

    const getTagLine = (data: any): string => {

        return (
            data?.details?.tagline ||
            data.character ||
            ''
        );
    };

    const getBackgroundImage = (data: any): string => {
        const baseURL = 'https://image.tmdb.org/t/p/original';

        let selectedProfile;
        if (Array.isArray(data.images?.profiles) && data.images.profiles.length > 0) {
            const idealAspect = 16 / 9;

            const scoredProfiles = data.images.profiles
                .map((p: any) => {
                    const aspectDiff = Math.abs(p.aspect_ratio - idealAspect);
                    const resolutionScore = p.width * p.height;
                    const score = (1 / (aspectDiff + 0.01)) * Math.log(resolutionScore); // small fudge to avoid div by 0
                    return { ...p, score };
                })
                .sort((a: any, b: any) => b.score - a.score);

            if (scoredProfiles.length > 0) {
                selectedProfile = `${baseURL}${scoredProfiles[0].file_path}`;
            }
        }

        const paths = [
            selectedProfile,
            data.profile_path && `${baseURL}${data.profile_path}`,
            data.details?.backdrop_path && `${baseURL}${data.details.backdrop_path}`,
            data.details?.background && `${baseURL}${data.details.background}`,
            data.background && `${baseURL}${data.background}`,
            data.backdrop_path && `${baseURL}${data.backdrop_path}`,
            data.banner,
            data.still_path && `${baseURL}${data.still_path}`,
            data.poster_path && `${baseURL}${data.poster_path}`,

        ];

        const found = paths.find(Boolean);
        return found ? `url(${found})` : '';
    };



    const getLinkPath = (type: string, data: any): string => {
        if (type === 'cast') return `/cast/${data.id}`;
        return `/details/${type}/${data.movie_id || data.id}`;
    };

    const renderGenres = () => (
        <div className="info">
            <span className="genres">
                {data.genres.map((genre: any, index: number) => {
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
    );

    const renderSelectMenu = () => (
        <div className="select">
            <span>Add to</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option>Which to add to</option>
                {options.map((option: any) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.getUserProfile(token);
                console.log(data);
                if (data) {
                    setOptions(data.communities);

                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        }
        fetchResults();
    }, []);

    useEffect(() => {
        console.log('Selected changed:', selected);
    }, [selected]);


    return (
        <header className={`${baseSegment} ${asideData?.length > 0 ? 'has-media' : ''}`}>
            <section style={{ backgroundImage: getBackgroundImage(data) }}>
                {baseSegment !== 'communities' && renderSelectMenu()}
                <div className="detail">
                    <h1>{data.name || data.original_name || data.title}</h1>
                    <h2>{tagline}</h2>
                    {Array.isArray(data.genres) && data.genres.length > 0 && renderGenres()}
                </div>
            </section>
            <aside>
                <ul>
                    {[...(baseSegment === 'cast'
                        ? asideData?.sort((a, b) => a.order - b.order)
                        : asideData)]
                        .map((data: any) => (
                            <li key={data.id} className={`item ${!getBackgroundImage(data) ? 'default-background' : ''}`}
                                style={getBackgroundImage(data) ? { backgroundImage: getBackgroundImage(data) } : {}}>
                                <Link to={getLinkPath(type, data)}>
                                    <div className="details">
                                        <p>{getDisplayTitle(data)}</p>
                                        <span>{getTagLine(data)}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside>
        </header>
    )
}