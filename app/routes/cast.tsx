
import type { Route } from "./+types/cast";
import { CastScreen } from "~/pages/cast/cast";

import { useParams } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Cast" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Cast() {
    const { id = '' } = useParams();
    return <CastScreen id={id} />;
}
