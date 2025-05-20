import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('trending', 'routes/trending.tsx'),
    route('communities', 'routes/communities.tsx'),
    route('community/:id', 'routes/community.tsx'),
    route('login', 'routes/login.tsx'),
    route('logout', 'routes/logout.tsx'),
    route('signup', 'routes/signup.tsx'),
    route('search/:type/:query/:page', 'routes/search.tsx'),
    route('details/:type/:id', 'routes/details.tsx'),
    route('cast/:id', 'routes/cast.tsx')
] satisfies RouteConfig;
