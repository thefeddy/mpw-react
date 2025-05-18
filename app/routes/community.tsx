import { useParams } from "react-router";
import type { Route } from "./+types/communities";

import { CommunityScreen } from '~/pages/community/community';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Welcome to MPW" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Community() {
    const { id = '' } = useParams();
    return <CommunityScreen id={id} />;
}
