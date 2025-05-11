import type { Route } from "./+types/trending";
import { TrendingScreen } from '~/pages/trending/trending'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Trending Movies" },
    ];
}

export default function TrendingRoute() {
    return <TrendingScreen />;
}
