/* SCSS */
import './Header.scss'

/* Intefaces */
import type { HeaderProps } from './types';

/* Utils */
import { getGenreColors } from '~/utils/genres';

/* React */
import type { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom';



export default function Header({ data, type }: HeaderProps): JSX.Element {
    const location = useLocation();
    const pathParts = location.pathname.split('/').filter(Boolean); // removes empty strings

    const baseSegment = pathParts[0];

    const tagline =
        typeof data?.tagline === 'string' && data.tagline.trim() !== ''
            ? data.tagline
            : (Array.isArray(data?.members) && data?.created)
                ? `Members: ${data.members.length + 1} | Created: ${data.created}`
                : '';
    const asideData = data.credits?.cast ? data.credits?.cast : data.movies;

    /* Utils */
    const getDisplayTitle = (data: any): string => {
        return (
            data?.name ||
            data?.details?.title ||
            data?.details?.original_name ||
            data?.title ||
            'Untitled'
        );
    };

    const getTagLine = (data: any): string => {
        return (
            data?.details?.tagline ||
            data.character ||

            'Untitled'
        );
    };

    const getBackgroundImage = (data: any): string => {
        const baseURL = 'https://image.tmdb.org/t/p/original';

        let selectedProfile;
        if (Array.isArray(data.images?.profiles) && data.images.profiles.length > 0) {
            const idealAspect = 16 / 9;

            const scoredProfiles = data.images.profiles
                .map(p => {
                    const aspectDiff = Math.abs(p.aspect_ratio - idealAspect);
                    const resolutionScore = p.width * p.height;
                    const score = (1 / (aspectDiff + 0.01)) * Math.log(resolutionScore); // small fudge to avoid div by 0
                    return { ...p, score };
                })
                .sort((a, b) => b.score - a.score);

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
            data.banner
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

    return (
        <header className={`${baseSegment} ${asideData.length > 0 ? 'has-media' : ''}`}>
            <section style={{ backgroundImage: getBackgroundImage(data) }}>
                <div className="detail">
                    <h1>{data.name || data.original_name || data.title}</h1>
                    <h2>{tagline}</h2>
                    {Array.isArray(data.genres) && data.genres.length > 0 && renderGenres()}
                </div>

            </section>
            <aside>
                <ul>
                    {asideData.map((data: any) => (
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
