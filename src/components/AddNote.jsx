import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [color, setColor] = useState('');
    const { user } = useSelector(state => state.user)
    let user1 = localStorage.getItem('user')
    user1 = JSON.parse(user1 || null)
    // const { token, userData } = user;
    const token1 = localStorage.getItem('authToken')
    // JSON.parse(token1);
    // console.log("Token2 : ", token1);
    const parsedToken = JSON.parse(token1);

    // Log the parsed token to the console
    // console.log("Parsed Token: ", parsedToken);

    const handleAddNote = async (e) => {
        e.preventDefault();
        const dataValue = {
            title,
            content,
            date,
            color,
            userId: user1.id
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/add-note', dataValue, { headers: { Authorization: parsedToken } })
            console.log("data=>", data);
            if (data.success) {
                //  console.log('hi')
                toast(data.message);
                setContent('');
                setColor('');
                setDate('');
                setTitle('');
                //alert(data.message)
            }
            else {
                //  alert(data.message)
                toast(data.message);

            }
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='add-note'>
            <div className="title">
                <h2>Add Note</h2>
                <ToastContainer />
            </div>
            <div className="form">
                <input type="text" placeholder='Title of note' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea name="" id="" cols="50" rows="10" placeholder='write note' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <input type='date' placeholder='Date' value={date} onChange={e => setDate(e.target.value)} />
                <input type='color' style={{ width: '100%' }} value={color} onChange={(e) => setColor(e.target.value)} />
                <button onClick={handleAddNote} className="button-64"><span className="text">Add Note</span></button>
            </div>
        </div>
    )
}

export default AddNote