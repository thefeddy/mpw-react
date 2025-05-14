
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

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.auth(email, password, remember);

            if (response.access_token) {
                const { access_token } = await response;
                login(access_token);
                navigate('/communities/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <form className="login-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>Email</label>
                <input type="email" placeholder="Email"
                    required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input type="password" placeholder="password" name="current-password"
                    required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="remember">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label>Remember me</label>
                </div>
                <button type="submit">Sign In</button>
            </form>
            <LinesBG />
        </main>
    );
}