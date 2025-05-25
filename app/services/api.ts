const API_URL = 'http://localhost:3000/api';

const headers = {
    'Content-Type': 'application/json',
};

/* Context */
import type { UserCreate } from '~/interfaces/UserContext.interface';

// Can most likely make a majority of these calls generic
const api = {
    async searchTV(type: string, query: string, page: number): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/search/${type}/${encodeURIComponent(query)}/${page}`, {
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
    async getGenres(): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/media/genres/`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    async getDetails(type: string, id: string): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/media/details/${type}/${id}/`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    async getSeasonDetails(id: number, season: number): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/media/season/${id}/${season}/`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    async getTrending(): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/media/trending/`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    async getCast(id: number): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/cast/${id}`, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    // note to self, this is okay for the account page, but i should make another call just for communities
    async getUserProfile(jwt: any): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/user/profile/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
    async auth(email: string, password: string, remember: boolean): Promise<any> {

        let body = new URLSearchParams();
        body.append('email', email);
        body.append('password', password);
        body.append('remember', String(remember));

        try {
            const res = await fetch(`${API_URL}/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
                redirect: 'follow'
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },

    async validate(jwt: any): Promise<any> {
        try {
            const res = await fetch(`${API_URL}/auth/validate-token/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}`, },
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },

    async signup(user: UserCreate): Promise<any> {
        console.log(user);
        let body = new URLSearchParams();
        body.append('email', user.email);
        body.append('password', user.password);
        body.append('display_name', user.display_name);

        try {
            const res = await fetch(`${API_URL}/user/create/`, {
                method: 'POST',
                body,
                redirect: 'follow'
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('API error in genres:', err);
            return null;
        }
    },
};

export default api;