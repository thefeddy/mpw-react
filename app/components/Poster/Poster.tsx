/* SCSS */
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
                        {details.data.vote_average}
                        {/* <i>|</i>
                        <div className="genres">
                            <p>{details.data.genres.map((genre: any) => genre.name).join(', ')}</p>
                        </div> */}
                    </div>
                </div>
            </div >
        </>
    )
}
