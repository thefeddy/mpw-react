import type { CastDetails } from '~/types/cast';

export const createDefaultCastDetails = (): CastDetails => ({
    adult: false,
    also_known_as: [],
    background: "",
    biography: "Biography details are being retrieved from the archives...",
    birthday: null,
    credits: {
        cast: [],
        crew: []
    },
    deathday: null,
    gender: 0,
    homepage: null,
    id: 0,
    images: {
        profiles: []
    },
    imdb_id: "",
    known_for_department: "Acting",
    name: "Loading Profile...",
    place_of_birth: null,
    popularity: 0,
    profile_path: null,
    details: null
});