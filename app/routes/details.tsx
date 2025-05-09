import { useParams } from 'react-router-dom';
import { DetailScreen } from '../pages/details/details';

export default function DetailRoute() {
    const { type = 'movie', id = '' } = useParams();
    return <DetailScreen type={type} id={id} />;
}