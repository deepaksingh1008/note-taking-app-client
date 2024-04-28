import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate();
    const handleOnclick = async (e) => {
        e.preventDefault()
        const dataValue = { name, email, password, answer }
        const { data } = await axios.post('http://localhost:5000/api/v1/register', dataValue);
        // console.log(data)
        if (data.success) {
            navigate('/login');
        }
        else {
            alert(data.message);
        }
    }

    return (
        <div className='register'>
            <form action=''>
                <h2>Register</h2>
                <input type="text" id="username" value={name} name="username" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                <input type="text" value={email} name="" id="" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />

                <input type="text" value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                <div className='fav'>
                    <p>What is your favrouite sport</p>
                    <input type="text" value={answer} placeholder='Write your answer' onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <div className="btn">
                    <button onClick={handleOnclick}>Register</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Register