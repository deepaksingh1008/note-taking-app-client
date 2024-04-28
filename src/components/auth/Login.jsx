import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const handleOnclick = async (e) => {
        e.preventDefault()
        const dataValue = { email, password }

        const { data } = await axios.post('http://localhost:5000/api/v1/login', dataValue);
        console.log(data);
        if (data.success) {
            dispatch(login({ userData: data.user, token: data.token }))
            localStorage.setItem("authToken", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate('/')
        }
        else {
            alert(data.message);
        }
    }

    return (
        <div className='register'>
            <form action=''>
                <h2>Login</h2>
                <input type="text" value={email} name="" id="" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />

                <input type="text" value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

                <div className="btn">
                    <button onClick={handleOnclick}>Login</button>
                    <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                </div>
            </form>
        </div>
    )
}

export default Login