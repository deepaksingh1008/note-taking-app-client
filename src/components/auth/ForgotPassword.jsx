import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [email, setEmail] = useState('')
    const [answer, setAnswer] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleOnclick = async (e) => {
        e.preventDefault()
        const dataValue = { email, newPassword: password, answer }
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/forgot-password', dataValue);
            if (data.success) {
                //  alert(data.message);
                navigate('/login');

            }
            else {
                alert(data.message);
            }
        }
        catch (err) {
            //  console.log(err);
            alert("Something went wrong!");
        }
    }

    return (
        <div className='register'>
            <form action=''>
                <h2>Forget Password</h2>
                <input type="text" value={email} name="" id="" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />

                <input type="text" value={password} placeholder='Enter new password' onChange={(e) => setPassword(e.target.value)} />
                <div className='fav'>
                    <p>What is your favrouite sport</p>
                    <input type="text" value={answer} placeholder='Write your answer' onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <div className="btn">
                    <button onClick={handleOnclick}>Change Password</button>

                </div>
            </form>
        </div>
    )
}

export default Register