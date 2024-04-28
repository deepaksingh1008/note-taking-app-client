import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = () => {

    let user1 = localStorage.getItem('user')
    user1 = JSON.parse(user1 || null)

    return (
        user1 != null ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute