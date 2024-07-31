import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import StatesContext from '../context/StatesContext';

const AuthRoute = () => {
    const context = useContext(StatesContext);
    const { state } = context;

    if (!state.user) {
        return <Outlet />;
    } else {
        return <Navigate to="/dashboard" />
    }
};

export default AuthRoute;
