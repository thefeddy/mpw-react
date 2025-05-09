/* SCSS */
import './style.scss'

/* Services */
import api from '~/services/api';

/* Libs */
import type { JSX } from 'react'
import { useState, useEffect } from 'react';

export default function Poster(details: any): JSX.Element {
    return (
        <>
            <div className="panel">
                {details.data.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500/${details.data.poster_path}`} />
                ) : (
                    <img src="/img/no-poster.png" />
                )}

                <div className="name">
                    <span>{details.data.title}<em>({details.data.original_language})</em></span>
                    <div className="info">
                        <em></em>
                        {details.data.vote_average.toFixed(1)}
                        <i>|</i>
                        <div className="genres">
                            {details.data.genres}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
