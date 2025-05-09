/* SCSS */
import './scss/app.scss';

/* Components */
import Header from './components/Header/Header';

/* React */
import type { Route } from "./+types/root";
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
                <Header />
                {children}
                <ScrollRestoration />
                <Scripts />
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

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
