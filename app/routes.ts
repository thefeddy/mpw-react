import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('trending', 'routes/trending.tsx'),
    route('communities', 'routes/communities.tsx'),
    route('community/:id', 'routes/community.tsx'),
    route('search/:type/:query/:page', 'routes/search.tsx'),
    route('details/:type/:id', 'routes/details.tsx'),
    route('cast/:id', 'routes/cast.tsx'),
    route('season/:id/:season', 'routes/season.tsx')
] satisfies RouteConfig;
