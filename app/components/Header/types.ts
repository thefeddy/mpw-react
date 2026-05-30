import type { TrackstripItem } from "./interfaces/TrackstripItem";

export interface HeaderProps {
    title: string;
    tagline?: string;
    backgroundImage: string;
    trackstripItems?: TrackstripItem[];
    className?: string; // e.g., 'movie', 'tv', 'cast' for styling hooks
    children?: React.ReactNode;
    type?: string;
}