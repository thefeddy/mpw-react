export interface SearchScreenProps {
    type: string;
    query: string;
    page: string;
}

export interface Item {
    id: number;
    type: string;
    title: string;
    [key: string]: any; // Optional for additional properties
}