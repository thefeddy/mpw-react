import './style.scss';

interface SearchHeaderProps {
    query: string;
}

// Move this into a config file  and rework , doing two for the same theme is dumb but, I is being lazy.


const VINTAGE_THEMES: Record<string, string> = {
    'batman': '--theme-70s-batman',
    'superman': '--theme-70s-superman',
    'sci-fi': '--theme-70s-space',
    'star wars': '--theme-70s-starwars',
    'empire strikes back': '--theme-70s-starwars',
    'spaceballs': '--theme-70s-spaceballs',
    'pulp fiction': '--theme-70s-pulp',
    'die hard': '--theme-70s-diehard',
    'the godfather': '--theme-70s-godfather',
    'godfather': '--theme-70s-godfather',
    'goodfellas': '--theme-70s-goodfellas',
    'the shawshank redemption': '--theme-70s-shawshank',
    'the lord of the rings': '--theme-70s-lotr',
    'lotr': '--theme-70s-lotr',
    'fight club': '--theme-70s-fightclub',
    'the matrix': '--theme-70s-matrix',
    'toy story': '--theme-70s-toystory',
    'back to the future': '--theme-70s-bttf',
    'bttf': '--theme-70s-bttf',
    'tmnt': '--theme-70s-tmnt',
    'teenage mutant ninja turtles': '--theme-70s-tmnt',
    'alien': '--theme-70s-alien',
    'aliens': '--theme-70s-alien',
    'indiana jones': '--theme-70s-indy',
    'trending': '--theme-70s-trending',
    'transformers': '--theme-70s-transformers'
};


export function SearchHeader({ query }: SearchHeaderProps) {
    const normalizedQuery = query.toLowerCase().trim();
    const themeModifier = VINTAGE_THEMES[normalizedQuery] || '';

    return (
        <header className={`retro-search-header ${themeModifier}`}>
            <div className="retro-search-header__meta">
                <span className="catalog-prefix">SYS_INDEX_78</span>
                <span className="status-node">RECORD_FOUND</span>
            </div>
            <h1 className="retro-search-header__query">
                {query}
            </h1>
        </header>
    );
}