import type { Route } from "./+types/communities";
import { CommunitiesScreen } from '~/pages/communities/communities';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Welcome to MPW" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Communities() {
    return <CommunitiesScreen />;
}
