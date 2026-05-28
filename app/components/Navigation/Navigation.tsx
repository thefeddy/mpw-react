/* SCSS */
import './Navigation.scss';

/* Routes */
import ProtectedLink from '~/routes/ProtectedLink';

/* React */
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';

/* Google Auth */
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

interface UserSession {
    display_name: string;
    photo?: string;
    email: string;
}

export default function Navigation(): JSX.Element {
    // 1. Manage reactive state for the user session
    const [user, setUser] = useState<UserSession | null>(null);

    // 2. Read the existing session token or user data on initial mount
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
                    <Link to={`/`}>Search</Link>
                </li>
                <li>
                    <ProtectedLink to={`/communities/`}>Communities</ProtectedLink>
                </li>
                <li>
                    <Link to={`/trending`}>Trending</Link>
                </li>

                <li id="login">
                    {user ? (
                        <div className="user-profile-widget">
                            {user.photo && (
                                <img
                                    src={user.photo}
                                    alt={user.display_name}
                                    className="user-avatar"
                                />
                            )}
                            <span className="user-name">{user.display_name}</span>
                            <a onClick={handleLogout} className="logout-btn">
                                Sign Out
                            </a>
                        </div>
                    ) : (
                        <GoogleOAuthProvider clientId="721025006841-18dq69dbl92pvk4m0dc3g4f9i8efchfq.apps.googleusercontent.com">
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