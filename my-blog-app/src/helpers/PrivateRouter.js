import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import Sidebar from '../components/SideBar';
export default function PrivateRouter() {
    const cookies = new Cookies();
// Solo entran los que son administradores
    return (
        cookies.get('status') ? <Sidebar><Outlet /></Sidebar> : <Navigate to="/" />
    )
}
