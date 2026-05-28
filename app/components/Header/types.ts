import type { AsideItem } from "./interfaces/AsideItem";

export interface HeaderProps {
    title: string;
    tagline?: string;
    backgroundImage: string;
    asideItems?: AsideItem[];
    className?: string; // e.g., 'movie', 'tv', 'cast' for styling hooks
    children?: React.ReactNode;
}