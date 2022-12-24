import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export { RestrictedRoute };

// Restricted routes are used by users that are not logged in
function RestrictedRoute({ children } : {children: any}) {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    if (authenticated) {
        // If the user is already logged in we redirect him to the Dashboard
        return <Navigate to="/dashboard"/>
    }

    return children;
}