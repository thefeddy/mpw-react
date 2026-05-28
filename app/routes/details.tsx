import type { Route } from "./+types/details";

import { useParams } from 'react-router-dom';
import { DetailScreen } from '../pages/details/details';


export default function DetailRoute() {
    const { type = 'movie', id = '' } = useParams();
    const handleTitleChange = (title: string) => {
        document.title = `${title} | The Theatre`;
    };

    return <DetailScreen type={type} id={id} onDataLoaded={handleTitleChange} />;
}