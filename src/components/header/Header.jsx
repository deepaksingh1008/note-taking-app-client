import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin, user } = useSelector((state) => state.user);
    let user1 = localStorage.getItem('user')
    user1 = JSON.parse(user1 || null)
    const handleLogout = (e) => {
        e.preventDefault()
        navigate('/login')
        localStorage.clear();

    }

    return (
        <div className='header'>
            <dir className='logo'>
                <Link to='/'> <h4>Note Taking App</h4></Link>
            </dir>
            <div className="nav">
                {user1 != null ? (<><Link to='/'><li>Home</li></Link>
                    <Link to='/add-note'><li>AddNote</li></Link>
                    <Link to="/show-note"><li>Show Notes</li></Link>
                    <Link onClick={handleLogout}><li>Logout({user1?.name})</li></Link>
                </>) : (<> <Link to="/login"><li>Login</li></Link>
                    <Link to="/register"> <li>Register</li></Link></>)}



            </div>
        </div>
    )
}

export default Header