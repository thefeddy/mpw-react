import type { Route } from "./+types/login";
import { LoginScreen } from "~/pages/login/login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login to MPW" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Home() {
    return <LoginScreen />;
}
