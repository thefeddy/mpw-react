/* SCSS */
import './Header.scss'

/* Intefaces & */
import type { HeaderProps } from './types';
import type { AsideItem } from './interfaces/AsideItem';

/* Utils */
import { getGenreColors } from '~/components/GenreBadges/genres';

/* React */
import { type JSX } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function Header({ title,
    tagline,
    backgroundImage,
    asideItems = [],
    className = '',
    children
}: HeaderProps): JSX.Element {
    const hasAside = asideItems.length > 0;
    return (
        <header className={`ui-header ${className} ${hasAside ? 'has-media' : ''}`}>
            <section style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}>
                <div className="detail">
                    <h1>{title}</h1>
                    {tagline && (<h2>{tagline}</h2>)}
                    {children}
                </div>
            </section>
            <div className="side">
                <ul>
                    {asideItems.map((item) => (
                        <li
                            key={item.id}
                            className={`item ${!item.image ? 'default-background' : ''}`}
                            style={item.image ? { backgroundImage: `url(${item.image})` } : {}}
                        >
                            <Link to={item.linkTo}>
                                <div className="details">
                                    <p>{item.title}</p>
                                    <span>{item.subtitle}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}