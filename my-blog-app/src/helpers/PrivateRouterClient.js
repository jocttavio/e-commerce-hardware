import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function PrivateRouterClient() {
    const cookies = new Cookies();

    return (
        cookies.get('status_usuario') ? <Outlet /> : <Navigate to="/login_user" />
    )}

    