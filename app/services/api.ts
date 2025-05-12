const API_URL = 'http://localhost:3000/api';

const headers = {
    'Content-Type': 'application/json',
};

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
            const res = await fetch(`${API_URL}/movies/genres/`, {
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
            const res = await fetch(`${API_URL}/movies/details/${type}/${id}/`, {
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
            const res = await fetch(`${API_URL}/movies/trending/`, {
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
};

export default api;