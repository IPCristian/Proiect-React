import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export { PrivateRoute };

// Private routes are used by users that are already logged in
function PrivateRoute({ children } : {children: any}) {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    if (!authenticated) {
        // If user isn't logged in, redirect him to Login Page
        return <Navigate to="/signin"/>
    }

    return children;
}