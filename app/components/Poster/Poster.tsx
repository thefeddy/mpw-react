/* SCSS */
import GenreBadges from '../GenreBadges/GenreBadges'
import './style.scss'

/* Libs */
import type { JSX } from 'react'


export default function Poster(details: any): JSX.Element {
    console.log(details);
    return (
        <>
            <div className="panel">
                {details.data.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500/${details.data.poster_path}`} />
                ) : (
                    <img src="/img/no-poster.png" />
                )}

                <div className="name">
                    <span>{details.data.title || details.data.name}<em>({details.data.original_language})</em></span>
                    <div className="info">
                        <em></em>
                        {details.data.vote_average.toFixed(1)}
                        <i>|</i>
                        {/* <GenreBadges genres={details.data.genre_ids} /> */}
                    </div>
                </div>
            </div >
        </>
    )
}
