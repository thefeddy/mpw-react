export interface DetailScreenProps {
    type: string;
    id: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface ImageSet {
    backdrops: Array<ImageResource>;
    logos: Array<ImageResource>;
    posters: Array<ImageResource>;
}

export interface ImageResource {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
    vote_average: number;
    vote_count: number;
}

export interface Credit {
    id: number;
    name: string;
    character?: string;
    job?: string;
    department?: string;
    profile_path?: string;

}

export interface StreamBuyRent {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number
}


export interface Stream {
    link: string;
    platform: string;
    buy: StreamBuyRent[];
    rent: StreamBuyRent[];
}

export interface YoutubeTrailer {
    name: string;
    size: string;
    source: string;
    type: string;
}

export interface Trailer {
    quicktime: string[];
    youtube: YoutubeTrailer[];
}

export interface VideoResult {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

export interface VideoSet {
    results: VideoResult[];
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export interface MediaDetail {
    adult: boolean;
    backdrop_path: string;
    background: string;
    belongs_to_collection: Collection | null;
    budget: number;
    credits: Record<string, Credit[]> | null;
    details: any | null;
    genres: Genre[];
    homepage: string;
    id: number;
    images: ImageSet;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    streams: Record<string, Stream>;
    tagline: string;
    title: string;
    trailers: Trailer | null;
    video: boolean;
    videos: VideoSet;
    vote_average: number;
    vote_count: number;
    seasons: Season[];
    original_name: string;
}
