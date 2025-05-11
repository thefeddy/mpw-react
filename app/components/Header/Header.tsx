/* SCSS */
import './Header.scss'

/* Libs */
import type { JSX } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Header(): JSX.Element {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Search</Link>
                        </li>
                        <li>
                            <Link to={`/communites`}>Communities</Link>
                        </li>
                        <li>
                            <Link to={`/trending`}>Trending</Link>
                        </li>
                        <li>
                            {/* <span id="login" @click="logout" v-if="loggedin">Logout</span> */}
                        </li>
                    </ul>
                </nav >

                {/* <router-link id="login" to="/login" v-if="!loggedin">Login</router-link>
            <router-link to="/signup" v-if="!loggedin">Sign Up</router-link>
            <p id="wb" v-if="loggedin">Welcome Back, <router-link to="/account/">{{ name }}</router-link>!</p> */}
            </header >

        </>
    )
}
