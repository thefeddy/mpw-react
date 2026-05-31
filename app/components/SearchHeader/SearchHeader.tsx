import './style.scss';

interface SearchHeaderProps {
    query: string;
}


const VINTAGE_THEMES: Record<string, string> = {
    'batman': '--theme-70s-dark',
    'superman': '--theme-70s-light',
    'sci-fi': '--theme-70s-space',
    'star wars': '--theme-70s-starwars',
    'empire strikes back': '--theme-70s-starwars',
    'spaceballs': '--theme-70s-spaceballs'
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