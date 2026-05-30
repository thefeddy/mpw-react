export interface CastCredit {
    id: number;
    title?: string;
    original_name?: string;
    name?: string;
    character: string;
    media_type: 'movie' | 'tv';
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    backdrop_path?: string;
    first_credit_air_date?: string;
}

export interface CrewCredit {
    id: number;
    title?: string;
    name?: string;
    department: string;
    job: string;
    media_type: 'movie' | 'tv';
    poster_path: string | null;
}

export interface MediaCredits {
    cast: CastCredit[];
    crew: CrewCredit[];
}

export interface ProfileImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface ImageCollection {
    profiles: ProfileImage[];
}

export interface CastDetails {
    adult: boolean;
    also_known_as: string[];
    background: string;
    biography: string;
    birthday: string | null;
    credits: MediaCredits;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    images: ImageCollection;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
    details: any;
}