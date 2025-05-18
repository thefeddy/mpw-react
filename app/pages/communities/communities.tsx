
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';

/* Services */
import api from '~/services/api';
import communities from '~/services/communities';

/* Interfaces */
import type { UserCommunities } from '~/interfaces/UserContext.interface';
import type { Community } from '~/interfaces/Communities.interface';
import { createDefaultCommunity } from '~/interfaces/defaults';

/* React */
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';


export function CommunitiesScreen() {

    const [details, setDetails] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await communities.getCommunities();
                if (data) {
                    setDetails(data);

                }

                console.log(details)
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

    }, []);

    return (
        <main>

            <h1>communities</h1>
            <div className="communities">
                {details.length > 0 ? (
                    details.map((item) => (
                        // TODO DESIGN WORK WEEEEEEEEEE
                        // also doing loading stuffs
                        <Link key={item.id} to={`/community/${item.id}`}>
                            <span key={item.id}>{item.name}</span>
                        </Link>
                    ))
                ) : (
                    <p>There are no Communities.</p>
                )}
            </div>
            <LinesBG />
        </main>
    );
}