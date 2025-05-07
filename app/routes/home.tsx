import type { Route } from "./+types/home";
import { Main } from "../pages/home/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Welcome to MPW" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Home() {
    return <Main />;
}
