/* SCSS */
import './Header.scss'

/* Intefaces */
import type { HeaderProps } from './types';

/* Utils */
import { getGenreColors } from '~/utils/genres';

/* React */
import type { JSX } from 'react'



export default function Header({ data }: HeaderProps): JSX.Element {
    const background = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data?.backdrop_path}`
        : data.background
            ? `https://image.tmdb.org/t/p/original${data?.background}`
            : data.banner;
    const tagline = data?.tagline ? data?.tagline : `Members: ${data.members.length + 1} | Created: ${data.created}`
    const asideData = data.credits?.cast ? data.credits?.cast : data.movies;

    const getBackgroundImage = (data: any): string => {
        const paths = [
            data.profile_path && `https://image.tmdb.org/t/p/original${data.profile_path}`,
            data.details?.backdrop_path && `https://image.tmdb.org/t/p/original${data.details.backdrop_path}`,
            data.details?.background && `https://image.tmdb.org/t/p/original${data.details.background}`,
            data.background && `https://image.tmdb.org/t/p/original${data.background}`,
            data.backdrop_path && `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            data.banner
        ];

        return `url(${paths.find(Boolean)})`;
    };

    return (
        <header>
            <section style={{ backgroundImage: getBackgroundImage(data) }}>
                <div className="detail">
                    <h1>{data.title || data.original_name || data.name}</h1>
                    <h2>{tagline}</h2>
                    {data.genres?.length > 0 && (
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
                    )}
                </div>

            </section>
            <aside>
                <ul>
                    {asideData.map((data: any) => (
                        <li className="item" key={data.id} style={{ backgroundImage: getBackgroundImage(data) }}>
                            <div className="details">
                                <p>{data.name || data.details.title || data.details.original_name}</p>
                                <span>{data?.details?.tagline}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </header>
    )
}
