/* SCSS */
import './Navigation.scss';

/* Routes */
import ProtectedLink from '~/routes/ProtectedLink';

/* React */
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Link, NavLink } from 'react-router-dom';

/* Google Auth */
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

interface UserSession {
    display_name: string;
    photo?: string;
    email: string;
}

export default function Navigation(): JSX.Element {
    const [user, setUser] = useState<UserSession | null>(null);
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const storedUser = localStorage.getItem('app_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user session data", e);
            }
        }
    }, []);

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/google/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('app_token', data.access_token);
                localStorage.setItem('app_user', JSON.stringify(data.user));
                setUser(data.user);
            } else {
                console.error('Backend validation failed', data);
            }
        } catch (error) {
            console.error('Network or server error during auth:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('app_token');
        localStorage.removeItem('app_user');

        setUser(null);
        googleLogout();
    };

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={`/`} className="btn-bumper">Search</NavLink>
                </li>
                <li>
                    <ProtectedLink to={`/communities/`}>Communities</ProtectedLink>
                </li>
                <li>
                    <NavLink to={`/trending`} className="btn-bumper">Trending</NavLink>
                </li>

                <li id="login">
                    {user ? (
                        <>
                            <NavLink to={`/profile`} className="btn-bumper username">{user.display_name}</NavLink>

                            <a onClick={handleLogout} className="btn-bumper signout">
                                Sign Out
                            </a>
                        </>
                    ) : (
                        <GoogleOAuthProvider clientId={googleClientId}>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => console.error('Login Failed')}
                            />
                        </GoogleOAuthProvider>
                    )}
                </li>
            </ul>
        </nav>
    );
}