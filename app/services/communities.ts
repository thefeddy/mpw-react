const API_URL = 'http://localhost:3000/api';

async function communityRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    const url = `${API_URL}${endpoint}`;
    const headers = new Headers(options.headers);

    headers.set('Content-Type', 'application/json');

    if (typeof window !== 'undefined') {
        const jwt = localStorage.getItem('app_token');
        if (jwt) {
            headers.set('Authorization', `Bearer ${jwt}`);
        }
    }

    try {
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`[Community API Error] Target: ${options.method || 'GET'} ${endpoint}`, error);
        return null;
    }
}


const communities = {
    getCommunities: () =>
        communityRequest('/community/'),

    getCommunitiesById: (id: number) =>
        communityRequest(`/community/${id}`),

    leaveCommunity: (id: number) =>
        communityRequest(`/community/leave/${id}`, { method: 'DELETE' }),

    joinCommunity: (id: number, priv: boolean = false, code: string = '') =>
        communityRequest(`/community/join/${id}`, { method: 'PATCH' }),

    addMedia: (community_id: number, media_id: number, type: string) =>
        communityRequest(`/community/${community_id}/add/${type}/${media_id}`, { method: 'PATCH' })
};

export default communities;