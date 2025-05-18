import type { Route } from "./+types/login";
import { SignupScreen } from "~/pages/signup/signup";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Signup to MPW" },
        { name: "description", content: "Welcome!" },
    ];
}

export default function Home() {
    return <SignupScreen />;
}
