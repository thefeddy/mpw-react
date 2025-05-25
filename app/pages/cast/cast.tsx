/* SCSS */
import './style.scss';

/* Components */

import Header from '~/components/Header/Header';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { CastScreenProps } from '~/interfaces/Cast.interface';

/* React */
import { useState, useEffect, useCallback } from 'react';

/* libs */
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router';


export const CastScreen: React.FC<CastScreenProps> = ({ id }) => {

    // 🏷️ State Management
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const fetchResults = async () => {
            try {
                const data = await api.getCast(Number(id));
                console.log(data);
                if (data) {
                    setDetails(data.details);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchResults();
    }, []);


    // 🌀 Loading State
    if (loading) return <p>Loading...</p>;


    // ✅ Render
    return (
        <>
            <Header data={details} side_type="movie" />
        </>
    );
};
