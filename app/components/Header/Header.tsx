/* SCSS */
import './Header.scss'

/* Store */
import { useUser } from '~/context/UserContext';

/* Routes */
import ProtectedLink from '~/routes/ProtectedLink';

/* Interfaces */
import type { DecodedUser } from '~/interfaces/DecodeUser.interace';

/* Libs */
import type { JSX } from 'react'
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';


export default function Header(): JSX.Element {
    const { token, logout } = useUser();
    const user: DecodedUser | null = token ? decodeToken<DecodedUser>(token) : null;

    return (
        <>
            <header>
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
                            {token ? (
                                <Link to={`/logout`}>Logout</Link>
                            ) : (
                                <Link to={`/login`}>Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                {token ? (
                    <p id="wb">Welcome Back, <ProtectedLink to={`/account/`}>{user?.display_name}</ProtectedLink>!</p>
                ) : (
                    <Link to={`/signup`}>Signup</Link>
                )}

            </header >

        </>
    )
}
