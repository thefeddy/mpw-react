
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from 'app/components/LinesBG/LinesBG';

/* Services */
import api from '~/services/api';

/* Context */
import { useUser } from '~/context/UserContext';

/* React */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutScreen() {
    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        logout();          // Clear JWT and local state
        navigate('/'); // Redirect to login
    }, [logout, navigate]);

    return (
        <main>
            <div>
                <p>Logging out...</p>
            </div>
            <LinesBG />
        </main>
    );
}