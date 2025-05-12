import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('trending', 'routes/trending.tsx'),
    route('login', 'routes/login.tsx'),
    route('search/:type/:query/:page', 'routes/search.tsx'),
    route('details/:type/:id', 'routes/details.tsx')
] satisfies RouteConfig;
