import type { Genre } from '~/utils/genres.d';

export const GENRES: Genre[] = [
    { id: 28, name: 'Action', primaryColor: '#e5771e', accentColor: '#bb3f03' },
    { id: 12, name: 'Adventure', primaryColor: '#d4a017', accentColor: '#b38600' },
    { id: 10759, name: 'Action & Adventure', primaryColor: '#d35400', accentColor: '#a04000' },
    { id: 16, name: 'Animation', primaryColor: '#ffb142', accentColor: '#e08728' },
    { id: 35, name: 'Comedy', primaryColor: '#ffda79', accentColor: '#cfa727' },
    { id: 80, name: 'Crime', primaryColor: '#9b111e', accentColor: '#7c0b14' },
    { id: 99, name: 'Documentary', primaryColor: '#7dcea0', accentColor: '#4caf50' },
    { id: 18, name: 'Drama', primaryColor: '#a569bd', accentColor: '#8e44ad' },
    { id: 10751, name: 'Family', primaryColor: '#ffb3b3', accentColor: '#e57373' },
    { id: 14, name: 'Fantasy', primaryColor: '#3b5998', accentColor: '#2c3e50' },
    { id: 36, name: 'History', primaryColor: '#cd7f32', accentColor: '#a0522d' },
    { id: 27, name: 'Horror', primaryColor: '#4a235a', accentColor: '#2e1a33' },
    { id: 10402, name: 'Music', primaryColor: '#ff6f61', accentColor: '#c74c39' },
    { id: 9648, name: 'Mystery', primaryColor: '#34495e', accentColor: '#2c3e50' },
    { id: 10749, name: 'Romance', primaryColor: '#e75480', accentColor: '#c74360' },
    { id: 878, name: 'Science Fiction', primaryColor: '#16a085', accentColor: '#0e6655' },
    { id: 10765, name: 'Sci-Fi & Fantasy', primaryColor: '#1abc9c', accentColor: '#117a65' },
    { id: 10770, name: 'TV Movie', primaryColor: '#f39c12', accentColor: '#d68910' },
    { id: 53, name: 'Thriller', primaryColor: '#9b59b6', accentColor: '#7d3c98' },
    { id: 10752, name: 'War', primaryColor: '#5d6d7e', accentColor: '#34495e' },
    { id: 37, name: 'Western', primaryColor: '#a0522d', accentColor: '#8b4513' },
    { id: 10762, name: 'Kids', primaryColor: '#f5b041', accentColor: '#ca6f1e' },
    { id: 10763, name: 'News', primaryColor: '#3498db', accentColor: '#2e86c1' },
    { id: 10764, name: 'Reality', primaryColor: '#ec7063', accentColor: '#c0392b' },
    { id: 10766, name: 'Soap', primaryColor: '#f1948a', accentColor: '#cd6155' },
    { id: 10767, name: 'Talk', primaryColor: '#58d68d', accentColor: '#28b463' },
    { id: 10768, name: 'War & Politics', primaryColor: '#566573', accentColor: '#2c3e50' }
];
export const getGenreColors = (name: string) => {
    const genre = GENRES.find((g) => g.name === name);
    return genre ? { primary: genre.primaryColor, accent: genre.accentColor } : { primary: '#e5771e', accent: '#bb3f03' };
};