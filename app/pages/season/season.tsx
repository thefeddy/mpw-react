/* SCSS */
import './style.scss';

/* Components */

import Header from '~/components/Header/Header';

/* Services */
import api from '~/services/api';

/* Interfaces */
import type { SeasonScreenProps } from '~/interfaces/SeasonScreen.interface';

/* React */
import { useState, useEffect, useCallback } from 'react';

/* libs */
import { format } from "date-fns";
import { Link, useNavigate } from 'react-router';


export const SeasonScreen: React.FC<SeasonScreenProps> = ({ id, season }) => {

    // 🏷️ State Management
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        console.log(id, season);
        const fetchResults = async () => {
            try {
                const data = await api.getSeasonDetails(Number(id), Number(season));
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
            <Header data={details} side_type="episode" />
        </>
    );
};
