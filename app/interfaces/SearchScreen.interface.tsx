export interface SearchScreenProps {
    type: string;
    query: string;
    page: string;
}

// This Item is also being used in Trending, should move this out into it's own file
export interface Item {
    id: number;
    type: string;
    title: string;
    [key: string]: any;
}