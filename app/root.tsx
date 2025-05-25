/* SCSS */
import './scss/app.scss';

/* Services */
import api from '~/services/api';

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';

/* Components */
import Navigation from '~/components/Navigation/Navigation';

/* Utils */
import { errorQuotes } from '~/utils/quotes';

/* Context */
import { UserProvider, useUser } from '~/context/UserContext';


/* React */
import type { Route } from "./+types/root";


import { useEffect, useState } from 'react';

import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";




export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap",
    },
];



export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/fav/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/fav/pple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/fav/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/fav/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/fav/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/fav/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/fav/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon-precomposed" sizes="152x152" href="a/fav/pple-touch-icon-152x152.png" />
                <link rel="icon" type="image/png" href="/fav/favicon-196x196.png" sizes="196x196" />
                <link rel="icon" type="image/png" href="/fav/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/png" href="/fav/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" type="image/png" href="/fav/favicon-16x16.png" sizes="16x16" />
                <link rel="icon" type="image/png" href="/fav/favicon-128.png" sizes="128x128" />
                <meta name="application-name" content="&nbsp;" />
                <meta name="msapplication-TileColor" content="#FFFFFF" />
                <meta name="msapplication-TileImage" content="/fav/mstile-144x144.png" />
                <meta name="msapplication-square70x70logo" content="/fav/mstile-70x70.png" />
                <meta name="msapplication-square150x150logo" content="/fav/mstile-150x150.png" />
                <meta name="msapplication-wide310x150logo" content="/fav/mstile-310x150.png" />
                <meta name="msapplication-square310x310logo" content="/fav/mstile-310x310.png" />

                <Meta />
                <Links />
            </head>
            <body>
                <UserProvider>
                    <div id="desktop">
                        <img src="/img/mpw.png" />
                        <h1>Mobile is being worked on, sorry for the delay</h1>
                        <LinesBG />
                    </div>
                    <Navigation />
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </UserProvider>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    const [randomQuote, setRandomQuote] = useState(Object.values(errorQuotes)[0]);

    useEffect(() => {
        let statusCode = 'any';

        if (isRouteErrorResponse(error)) {
            statusCode = String(error.status);
        }

        const matchingQuotes = Object.values(errorQuotes).filter(q =>
            q.tags.includes(statusCode) || q.tags.includes('any')
        );

        if (matchingQuotes.length > 0) {
            const selected = matchingQuotes[Math.floor(Math.random() * matchingQuotes.length)];
            setRandomQuote(selected);
        }
    }, [error]);

    if (isRouteErrorResponse(error)) {
        message = String(error.status);
        details =
            error.status === 404
                ? "Uh, excuse me, what are ya doing here?!"
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main id="four-oh-four">
            <LinesBG />

            <img src="/img/mpw.png" />
            <h1>{message}</h1>

            <blockquote className="error-quote" style={{ textAlign: 'center' }}>
                <p>"{randomQuote.quote}"</p>
                <footer>— {randomQuote.description}</footer>
            </blockquote>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}