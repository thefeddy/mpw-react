import { z } from 'zod';

/* Shared / Reusable Schemas */
const MediaAssetSchema = z.object({
    id: z.number().int().positive().default(0),
    name: z.string().min(1, 'Name is required').default(''),
    poster_path: z.string().nullable().default(''),
    backdrop_path: z.string().nullable().default(''),
});

const PersonSchema = z.object({
    id: z.number().int().positive().default(0),
    name: z.string().min(1, 'Name is required').default(''),
    original_name: z.string().min(1, 'Name is required').default(''),
    character: z.string().nullable().default(''),
    profile_path: z.string().nullable().default(''),
});

const CreditsSchema = z.object({
    cast: z.array(PersonSchema).default([]),
    crew: z.array(PersonSchema).default([]),
});

const GenresSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).optional(),
});

const ProductionCompanySchema = z.object({
    id: z.number().int().positive(),
    logo_path: z.string().nullable(),
    name: z.string().nullable(),
    origin_country: z.string().nullable(),
});

const ProductionCountrySchema = z.object({
    iso_3166_1: z.string().nullable(),
    name: z.string().nullable(),
});

const ImageSchema = z.object({
    aspect_ratio: z.number().nonnegative(),
    height: z.number().int().nonnegative(),
    iso_3166_1: z.string().nullable(),
    iso_639_1: z.string().nullable(),
    file_path: z.string().nullable(),
    vote_average: z.number().nonnegative().optional(),
    vote_count: z.number().nonnegative().optional(),
    width: z.number().nonnegative().optional(),
});

const ImagesSchema = z.object({
    backdrops: z.array(ImageSchema).default([]),
    logos: z.array(ImageSchema).default([]),
    posters: z.array(ImageSchema).default([]),
});

const SpokenLanguageSchema = z.object({
    iso_639_1: z.string().nullable(),
    name: z.string().nullable(),
    english_name: z.string().nullable(),
});
const StreamBuyRent = z.object({
    logo_path: z.string().nullable(),
    provider_name: z.string().nullable(),

    provider_id: z.number().min(0).optional(),
    display_priority: z.number().min(0).optional()
});
const WatchProviderItemSchema = z.object({
    logo_path: z.string().nullable(),
    provider_id: z.number().int().positive(),
    provider_name: z.string(),
    display_priority: z.number().int().optional(),
});

const CountryWatchProviderSchema = z.object({
    link: z.string().url(),
    flatrate: z.array(WatchProviderItemSchema).default([]),
    free: z.array(WatchProviderItemSchema).default([]),
    rent: z.array(WatchProviderItemSchema).optional(),
    buy: z.array(WatchProviderItemSchema).optional(),
});
const WatchProvidersSchema = z.object({
    results: z.record(z.string(), CountryWatchProviderSchema.nullish())
});


const SeasonsSchema = z.object({
    air_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format').nullish(),
    episode_count: z.number().min(0).optional(),
    id: z.number().int().positive(),
    name: z.string().min(1).nullish(),
    overview: z.string().nullish(),
    poster_path: z.string().nullish(),
    season_number: z.number().int().nullish(),
    vote_average: z.number().nonnegative().optional(),
    background: z.string().min(1).nullish()
});

/* Main Media Item Schema */
export const MediaItemSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1).optional(),
    original_name: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    overview: z.string().default('No overview available.'),
    poster_path: z.string().nullish(),
    backdrop_path: z.string().nullish(),
    background: z.string().nullish(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format').nullish(),

    vote_average: z.number().min(0).max(10).optional(),
    vote_count: z.number().min(0).optional(),
    genres: z.array(GenresSchema.nullish()).optional(),
    genres_ids: z.array(z.number()).default([]),
    type: z.enum(['movie', 'tv']).default('movie').optional(),

    belongs_to_collection: MediaAssetSchema.nullish(),
    budget: z.number().int().nonnegative().optional(),
    credits: CreditsSchema.nullish(),
    tagline: z.string().min(1).optional(),
    adult: z.boolean().optional(),
    imdb_id: z.string().nullable().optional(),
    origin_country: z.array(z.string()).nullish(),
    original_language: z.string().nullish(),
    original_title: z.string().nullish(),
    popularity: z.number().nonnegative().optional(),
    production_companies: z.array(ProductionCompanySchema).nullish(),
    production_countries: z.array(ProductionCountrySchema).nullish(),
    images: ImagesSchema.nullish(),
    homepage: z.string().nullish(),
    revenue: z.number().nonnegative().optional(),
    runtime: z.number().nonnegative().optional(),
    spoken_languages: z.array(SpokenLanguageSchema).nullish(),
    status: z.string().min(1).optional(),
    seasons: z.array(SeasonsSchema).optional(),
    video: z.boolean().optional(),
    watchProviders: WatchProvidersSchema.nullish()
});

export type MediaItem = z.infer<typeof MediaItemSchema>;

export const DetailsResponseSchema = z.object({
    details: MediaItemSchema.optional(),
}).transform(
    (data) => data.details
)
export type DetailsResponse = z.infer<typeof DetailsResponseSchema>;


/* Trending Results */
export const TrendingResponseSchema = z.object({
    results: z.array(MediaItemSchema),
});
export type TrendingResponse = z.infer<typeof TrendingResponseSchema>;


/* General Results */
const PaginationSchema = z.object({
    pages: z.number().int().min(1),
    current: z.number().int().min(1),
    results: z.number().int().min(0),
});

export const PaginatedResultsSchema = z.object({
    pagination: PaginationSchema,
    results: z.array(MediaItemSchema),
});

export type PaginatedResults = z.infer<typeof PaginatedResultsSchema>;