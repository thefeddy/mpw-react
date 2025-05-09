import { useParams } from 'react-router-dom';
import { SearchScreen } from '../pages/search/search';

export default function SearchRoute() {
    const { type = 'movie', query = '', page = '' } = useParams();

    return <SearchScreen type={type} query={query} page={page} />;
}
