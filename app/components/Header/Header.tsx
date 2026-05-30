/* SCSS */
import './Header.scss'

/* Intefaces & */
import type { HeaderProps } from './types';
import type { TrackstripItem } from './interfaces/TrackstripItem';

/* Utils */


/* React */
import { type JSX } from 'react'
import { Link, useParams } from 'react-router-dom';

import TrackStrip from '../TrackStrip/TrackStrip';

export default function Header({ title,
    tagline,
    backgroundImage,
    trackstripItems = [],
    className = '',
    children
}: HeaderProps): JSX.Element {
    const hasAside = trackstripItems.length > 0;

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
                <TrackStrip orientation="vertical">
                    {trackstripItems.map((item: TrackstripItem, index: number) => (
                        <div
                            key={index}
                            className={`track ${!item.image ? 'default-background' : ''}`}
                            style={item.image ? { backgroundImage: `url(${item.image})` } : {}}
                        >
                            <Link to={item.linkTo}>
                                <div className="details">
                                    <p>{item.title}</p>
                                    <span>{item.subtitle}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </TrackStrip>
            </div>
        </header>
    )
}