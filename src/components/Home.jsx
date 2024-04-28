import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home'>
            <div className="content">
                <h2>This is Note Taking App</h2>
                <p>You can create notes and save</p>
                <p>Created By Deepak Singh </p>
                <button onClick={() => navigate('/add-note')}>Create Note</button>
            </div>
            <div className="image">
                <img src="https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX=w480-h960-rw" alt="" />
            </div>
        </div>
    )
}

export default Home