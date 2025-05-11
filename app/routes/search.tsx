import type { Route } from "./+types/search";

import { useParams } from 'react-router-dom';
import { SearchScreen } from '../pages/search/search';

export function meta({ params }: Route.MetaArgs) {
    const { query } = params;
    return [
        { title: `Searching for ${query}` },
    ];
}


export default function SearchRoute() {
    const { type = 'movie', query = '', page = '' } = useParams();

    return <SearchScreen type={type} query={query} page={page} />;
}
