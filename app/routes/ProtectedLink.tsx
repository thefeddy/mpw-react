import { useUser } from '~/context/UserContext';
import { Navigate, NavLink } from 'react-router-dom';

interface ProtectedLinkProps {
    to: string;
    children: React.ReactNode;
}

const ProtectedLink = ({ to, children }: ProtectedLinkProps) => {
    const { isValid } = useUser();
    if (isValid === null) {
        return; // You can put a loader here
    }

    if (!isValid) {
        return <Navigate to="/login" />;
    }

    return <NavLink to={to} className="btn-bumper">{children}</NavLink>;
};

export default ProtectedLink;
