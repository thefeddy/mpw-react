const API_URL = 'http://localhost:3000/api';

const getJWT = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};


const communities = {
    async getCommunities(): Promise<any> {
        try {
            const JWT = getJWT();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            };
            const res = await fetch(`${API_URL}/community/`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in searchMovies:', err);
            return null;
        }
    },
    async getCommunitiesById(id: number): Promise<any> {
        try {
            const JWT = getJWT();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            };
            const res = await fetch(`${API_URL}/community/${id}`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in searchMovies:', err);
            return null;
        }
    },
    async leaveCommunity(id: number): Promise<any> {
        try {
            const JWT = getJWT();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            };
            const res = await fetch(`${API_URL}/community/leave/${id}`, {
                method: 'DELETE',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in searchMovies:', err);
            return null;
        }
    },
    async joinCommunity(id: number, priv: boolean = false, code: string = '',): Promise<any> {
        try {
            const JWT = getJWT();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            };
            const res = await fetch(`${API_URL}/community/join/${id}`, {
                method: 'PATCH',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in searchMovies:', err);
            return null;
        }
    }
};

export default communities;