import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [color, setColor] = useState('');
    const { user } = useSelector(state => state.user)
    //const { token, userData } = user;
    const { id } = useParams();
    const navigate = useNavigate();
    const token1 = localStorage.getItem('authToken')
    const parsedToken = JSON.parse(token1);

    const handleEditNote = async (e) => {

        e.preventDefault();
        const dataValue = {
            title,
            content,
            date,
            color,
        }
        try {
            const { data } = await axios.put(`https://note-takin-app-restapi.vercel.app/api/v1/update-note/${id}`, dataValue, { headers: { Authorization: parsedToken } })
            if (data.success) {
                // console.log('hi')

                toast(data.message);
                navigate('/show-note')
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
    const fetchSingleData = async () => {
        try {

            const { data } = await axios.get(`https://note-takin-app-restapi.vercel.app/api/v1/get-single-note/${id}`)
            console.log(data.singleNote);
            setContent(data.singleNote.content);
            setColor(data.singleNote.color);
            setTitle(data.singleNote.title);
            setDate(data.singleNote.data);

        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchSingleData()
    }, [])

    return (
        <div className='add-note'>
            <div className="title">
                <h2>Edit Note</h2>
                <ToastContainer />
            </div>
            <div className="form">
                <input type="text" placeholder='Title of note' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea name="" id="" cols="50" rows="10" placeholder='write note' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <input type='date' placeholder='Date' value={date} onChange={e => setDate(e.target.value)} />
                <input type='color' style={{ width: '100%' }} value={color} onChange={(e) => setColor(e.target.value)} />
                <button onClick={handleEditNote} className="button-64"><span className="text">Edit Note</span></button>
            </div>
        </div>
    )
}

export default EditNote;