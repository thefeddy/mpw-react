/* SCSS */
import './Navigation.scss'

/* Store */
import { useUser } from '~/context/UserContext';

/* Routes */
import ProtectedLink from '~/routes/ProtectedLink';

/* Interfaces */
import type { DecodedUser } from '~/interfaces/DecodeUser.interace';

/* Libs */
import { decodeToken } from 'react-jwt';

/* React */
import type { JSX } from 'react'
import { Link } from 'react-router-dom';


export default function Navigation(): JSX.Element {
    const { token } = useUser();
    const user: DecodedUser | null = token ? decodeToken<DecodedUser>(token) : null;

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
                    {token ? (
                        <Link to={`/logout`}>Logout</Link>
                    ) : (
                        <Link to={`/login`}>Login</Link>
                    )}
                </li>
            </ul>
            {token ? (
                <p id="wb">Welcome Back, <ProtectedLink to={`/account/`}>{user?.display_name}</ProtectedLink>!</p>
            ) : (
                <Link to={`/signup`}>Signup</Link>
            )}
        </nav>
    )
}
