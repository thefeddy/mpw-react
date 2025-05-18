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

export function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.signup({
                email,
                password,
                display_name: displayName,
            });

            if (response.statusCode === 201) {
                console.log('hai')
                const res = await api.auth(email, password, false);

                if (res.access_token) {
                    await login(res.access_token);
                    navigate('/communities/');
                }

            } else {
                setError('Signup failed. Please try again.');
            }
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="passwords">
                    <div className="password">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="password">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <label>Display Name</label>
                <input
                    type="text"
                    name="display_name"
                    placeholder="Display Name"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <span>{error && <p style={{ color: 'red' }}>{error}</p>}</span>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign In'}
                </button>
            </form>
            <LinesBG />
        </main>
    );
}
