import { useParams } from 'react-router-dom';
import { SearchScreen } from '../pages/search/search';

export default function SearchRoute() {
    const { type, query, page } = useParams();
    const pageNumber = parseInt(page ?? '1', 10);

    return <SearchScreen type={type ?? 'movie'} query={query ?? ''} page={pageNumber} />;
}