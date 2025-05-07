import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("search/:type/:query/:page", "routes/search.tsx") // Dynamic Search Route
] satisfies RouteConfig;
