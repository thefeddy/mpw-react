/* SCSS */
import './Header.scss'

/* Libs */
import type { JSX } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Header(): JSX.Element {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>

                        </li>
                        <li>
                            <a>Communities</a>
                        </li>
                        <li>

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
            <sub-header>
                <ul>
                    {/* <li><router-link to="/account/communities/">> My Communities</router-link></li>
                    <li><router-link to="/community/">> All</router-link></li> */}
                </ul>
            </sub-header>
        </>
    )
}
