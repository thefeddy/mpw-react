// ~/interfaces/defaults.ts
import type { MediaDetail } from '~/interfaces/MediaDetail.interface';
import type { UserCommunities } from './UserContext.interface';
import type { Community } from './Communities.interface';

export const createDefaultMediaDetail = (): MediaDetail => ({
    adult: false,
    backdrop_path: '',
    background: '',
    belongs_to_collection: null,
    budget: 0,
    credits: null,
    details: null,
    genres: [],
    homepage: '',
    id: 0,
    images: {
        backdrops: [],
        logos: [],
        posters: [],
    },
    imdb_id: '',
    origin_country: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    streams: null,
    tagline: '',
    title: '',
    trailers: null,
    video: false,
    videos: { results: [] },
    vote_average: 0,
    vote_count: 0,
    seasons: [],
    original_name: ''
});


export const createDefaultUserCommunities = (): UserCommunities => ({
    communities: [],
    display_name: '',
    id: 0,
    joined: ''
});

export const createDefaultCommunity = (): Community => ({
    id: 0,
    name: '',
    open: false,
    private: false,
    discord_webhook: '',
    banner: '',
    created: '',
    discord: '',
    photo: '',
});

