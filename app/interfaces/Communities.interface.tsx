import type { MediaDetail } from "./MediaDetail.interface";

export interface CommunityOwner {
    id: string;
    display_name: string;
    joined: string;
}
export interface CommunityMember {
    id: string;
    display_name: string;
    joined: string;
}
export interface Movie {
    added: string;
    background: string | null;
    details: MediaDetail;
    movie_id: number;
    id: number;
    rating: string | null
    watched_on: string | null;

}
export interface Community {
    id: number;
    name: string;
    open: boolean;
    private: boolean;
    discord_webhook: string | null;
    banner: string;
    created: string; // ISO Date string
    discord: string;
    photo: string;
    owner: CommunityOwner;
    members: CommunityMember[];
    isMember: boolean;
    isOwner: boolean;
    movies: Movie[];
}

export interface CommunityScreenProps {
    id: string;
}
