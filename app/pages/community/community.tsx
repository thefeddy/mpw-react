/* SCSS */
import './style.scss';

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';
import Modal from '~/components/Modal/Modal';
import Poster from '~/components/Poster/Poster';
import Header from '~/components/Header/Header';

/* Services */
import communities from '~/services/communities';

/* Interfaces */
import type { Community, CommunityScreenProps } from '~/interfaces/Communities.interface';
interface PasscodeFormProps {
    passcode: string | null;
    setPasscode: (value: string | null) => void;
}

/* React */
import { useState, useEffect, useCallback } from 'react';

/* libs */
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router';

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ id }) => {

    // 🏷️ State Management
    const [details, setDetails] = useState<Community | null>(null);
    const [watchedMovies, setWatchedMovies] = useState();
    const [unwatchedMovies, setUnwatchedMovies] = useState();
    const [passcode, setPasscode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Navigate
    const navigate = useNavigate();

    // 🔄 Fetch Data Logic
    const fetchDetails = useCallback(async () => {
        setLoading(true);

        try {
            const data = await communities.getCommunitiesById(Number(id));
            console.log(data);
            if (data && data.id) {
                const watchedMovies = data.movies
                    .filter((movie: any) => movie.watched_on !== null)
                    .map(({ details, ...rest }) => ({
                        ...rest,
                        ...details,
                    }));

                const unwatchedMovies = data.movies
                    .filter((movie: any) => movie.watched_on === null)
                    .map(({ details, ...rest }) => ({
                        ...rest,
                        ...details,
                    }));


                data.created = format(data.created, 'yyyy-MM-dd');
                setDetails(data);
                setWatchedMovies(watchedMovies);
                setUnwatchedMovies(unwatchedMovies);
            }

            if (!data) {
                navigate('/'); // deny access kick em out
            }




        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails, refresh]);

    // 🔃 Refresh Data
    const refreshData = () => setRefresh(prev => !prev);

    const join = async () => {
        // try {
        //     const res = await communities.joinCommunity(communityId, priv, code);
        //     console.log(res);
        //     if (res.statusCode === 202) {
        //         refreshData();
        //     }
        // } catch (error) {
        //     console.error("Error joining community:", error);
        // }
    };

    // 🚪 Leave Community
    const leaveCommunity = async (communityId: number) => {
        try {
            const res = await communities.leaveCommunity(communityId);

            console.log(res);
            if (res.statusCode === 202) {
                refreshData();
            }

        } catch (error) {
            console.error("Error leaving community:", error);
        }
    };

    // ➕ Join Community
    const joinCommunity = async (communityId: number, priv: boolean) => {
        if (priv) {
            const dialog = document.querySelector('dialog');
            setIsOpen(true)
        }
    };

    const PasscodeForm: React.FC<PasscodeFormProps> = ({ passcode, setPasscode }) => (
        <div className="form">
            <label htmlFor="passcode">Password</label>
            <input
                id="passcode"
                type="text"
                placeholder="passcode"
                required
                value={passcode ?? ''} // Fallback to empty string if null
                onChange={(e) => setPasscode(e.target.value || null)}
            />
            <button>Send</button>
        </div>
    );



    // 🌀 Loading State
    if (loading) return <p>Loading...</p>;
    if (!details) return <p>No details available.</p>;

    // ✅ Render
    return (
        <>
            {details.isOwner && (
                <nav className="owner-navigation">
                    <ul>
                        <li>
                            <Link to="/">Settings</Link>
                        </li>
                        <li>
                            <Link to="/">Members</Link>
                        </li>
                    </ul>
                </nav>
            )}

            <main className="community-details">
                <Header data={details} type="movie" />
                <section id="results">
                    {watchedMovies?.length > 0 && (
                        <>
                            <h1>Watched Movies</h1>
                            <div className="list">
                                {watchedMovies?.map((movie: any) => (
                                    <Link key={movie.id} to={`/details/movie/${movie.movie_id}`}>
                                        <Poster data={movie} />
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                    {unwatchedMovies?.length > 0 && (
                        <>
                            <h1>Unwatched Movies</h1>
                            <div className="list">
                                {unwatchedMovies?.map((movie: any) => (
                                    <Link key={movie.id} to={`/details/movie/${movie.movie_id}`}>
                                        <Poster data={movie} />
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </main >
        </>
    );
};
