import React, { useEffect } from 'react'
import { getNotes } from '../features/notes/noteSlice'
import { useSelector, useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShowNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { note } = useSelector(state => state.notes)
    const { user } = useSelector(state => state.user)
    const token1 = localStorage.getItem('authToken')
    const parsedToken = JSON.parse(token1);
    let user1 = localStorage.getItem('user')
    user1 = JSON.parse(user1 || null)
    //console.log("Note", note)
    const handleSearching = async (e) => {
        let search = e.target.value;
        if (search) {
            const { data } = await axios.get(`https://note-takin-app-restapi.vercel.app/api/v1/notes/search/${user1.id}?title=${search}`);
            dispatch(getNotes(data.notes));
        }
        else {
            fetchData();
        }
    }
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://note-takin-app-restapi.vercel.app/api/v1/delete-note/${id}`, {
                headers: {
                    Authorization: parsedToken,
                }
            });
            if (data.success) {
                toast(data.message);
                fetchData()

            }
            else {
                toast(data.message);
            }
        }
        catch (err) {
            toast(err);
        }

    }
    async function fetchData() {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/get-all-notes/${user1.id}`)
            if (data.success) {

                dispatch(getNotes(data.notes));
            }
            else {
                alert(data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='show-note'>
            <div className="record">
                <h1>Total Record {note?.length}</h1>
                <ToastContainer />
                <input type="text" placeholder='search by title' onChange={handleSearching} />
                {/* <button className='search-btn'>Search</button> */}
            </div>
            <div className="table">
                <table id="customers">
                    <tr>
                        <th>SNo</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Operation</th>

                    </tr>
                    {
                        note?.length === 0 ? (<h1>No Record found</h1>) : (

                            note?.map((item, idx) => (
                                <tr key={idx} style={{ backgroundColor: `${item.color}` }}>
                                    <td>{idx + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.content}</td>
                                    <td>{item.date}</td>
                                    <td><MdDelete onClick={() => { handleDelete(item._id) }} style={{ margin: "0px 10px 0px 2px", cursor: 'pointer' }} />  <FiEdit onClick={() => { navigate(`/update-note/${item._id}`) }} style={{ margin: "0px 10px 0px 10px", cursor: 'pointer', width: '10px' }} /></td>
                                </tr>
                            ))


                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default ShowNote