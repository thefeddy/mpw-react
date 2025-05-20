/* SCSS */
import './style.scss'

/* Services */
import api from '~/services/api';

/* Interace */
import type { StreamBuyRent } from '~/interfaces/MediaDetail.interface';

interface RenderStreamListProps {
    label: string;
    streams: StreamBuyRent[];
}


/* Reeact */
import type { JSX } from 'react'
import { useState, useEffect } from 'react';



export default function RenderStreamList({ label, streams }: RenderStreamListProps): JSX.Element | null {

    return (
        <div className="stream-list">
            <span>{label}</span>
            <ul>
                {streams?.map((stream: StreamBuyRent) => (
                    <li key={`${label}-${stream.provider_name}`}>
                        <img src={`https://image.tmdb.org/t/p/original/${stream.logo_path}`} alt={stream.provider_name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
