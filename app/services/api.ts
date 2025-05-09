const API_URL = 'http://localhost:3000/api';

const headers = {
    'Content-Type': 'application/json',
};

const api = {
    async searchTV(type: string, query: string, page: number): Promise<any> {
        console.log(query)
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
            const res = await fetch(`${API_URL}/genres/`, {
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
};

export default api;