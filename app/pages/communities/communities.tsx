
/* SCSS */
import './style.scss'

/* Components */
import LinesBG from '~/components/LinesBG/LinesBG';

/* Services */
import api from '~/services/api';

/* React */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CommunitiesScreen() {
    return (
        <main>
            <h1>communities</h1>
            <LinesBG />
        </main>
    );
}