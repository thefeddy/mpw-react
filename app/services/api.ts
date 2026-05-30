import type { UserCreate } from '~/interfaces/UserContext.interface';

const API_URL = 'http://localhost:3000/api';

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    const url = `${API_URL}${endpoint}`;

    const headers = new Headers(options.headers);

    if (!headers.has('Content-Type') && !(options.body instanceof URLSearchParams)) {
        headers.set('Content-Type', 'application/json');
    }

    const token = localStorage.getItem('app_token');
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`[API Transport Error] Failed target: ${endpoint}`, error);
        return null;
    }
}

const api = {
    searchTV: (type: string, query: string, page: number) =>
        request(`/search/${type}/${encodeURIComponent(query)}/${page}`),

    getGenres: () =>
        request('/media/genres/'),

    getDetails: (type: string, id: string) =>
        request(`/library/details/${type}/${id}/`),

    getSeasonDetails: (id: number, season: number) =>
        request(`/media/season/${id}/${season}/`),

    getTrending: () =>
        request('/library/trending/'),

    getCast: (id: number) =>
        request(`/library/cast/${id}`),

    getUserProfile: () =>
        request('/users/profile/'),

    auth: (email: string, password: string, remember: boolean) => {
        const body = new URLSearchParams({
            email,
            password,
            remember: String(remember)
        });
        return request('/auth/login/', {
            method: 'POST',
            body
        });
    },

    validateToken: () =>
        request('/auth/validate-token/', { method: 'POST' }),

    signup: (user: UserCreate) => {
        const body = new URLSearchParams({
            email: user.email,
            password: user.password,
            display_name: user.display_name
        });
        return request('/user/create/', {
            method: 'POST',
            body
        });
    }
};

export default api;