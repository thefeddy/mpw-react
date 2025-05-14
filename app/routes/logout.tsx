import type { Route } from "./+types/login";
import { LogoutScreen } from "~/pages/logout/logout";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Logging Out" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Home() {
    return <LogoutScreen />;
}
