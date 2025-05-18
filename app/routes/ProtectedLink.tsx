import { useUser } from '~/context/UserContext';
import { Navigate, Link } from 'react-router-dom';

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

    return <Link to={to}>{children}</Link>;
};

export default ProtectedLink;
