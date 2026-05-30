/* SCSS */
import './GenreBadges.scss'

/* Intefaces & */
interface Genre {
    id: number;
    name: string;
}

interface GenreBadgesProps {
    genres?: Genre[];
}

export default function GenreBadges({ genres = [] }: GenreBadgesProps) {
    if (!genres.length) return null;

    return (
        <div className="genre-badges-container">
            {genres.map((genre) => {
                const genreSlug = genre.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                    <span
                        key={genre.id}
                        className="genre-badge"
                        data-genre={genreSlug}

                    >
                        {genre.name}
                    </span>
                );
            })}
        </div>
    );
}