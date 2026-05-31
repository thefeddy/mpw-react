/* SCSS */
import './style.scss'

/* Libs */
import type { JSX } from 'react'

export default function Poster(details: any): JSX.Element {
    return (
        <>
            <div className="panel">
                {details.data.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500/${details.data.poster_path}`} />
                ) : (
                    <div className="default-background"></div>
                )}

                <div className="name">
                    <span>{details.data.title || details.data.name}<em>({details.data.original_language})</em></span>
                    <div className="info">
                        {details.data.vote_average.toFixed(1)}
                    </div>
                </div>
            </div >
        </>
    )
}
