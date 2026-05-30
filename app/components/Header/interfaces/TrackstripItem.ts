export interface TrackstripItem {
    id: number;
    title: string;
    subtitle: string | number;
    image: string;
    linkTo: string;
    type?: string;
    release_date?: string;
}