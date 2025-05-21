
import type { Route } from "./+types/season";
import { SeasonScreen } from "~/pages/season/season";

import { useParams } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Cast" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Season() {
    const { season = '', id = '' } = useParams();
    return <SeasonScreen id={id} season={season} />;
}
