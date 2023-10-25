

import React, { useEffect, useState } from 'react';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function AddPostBox() {
    const [postContent, setTaskContent] = useState({ title: "", description: "" });
    const [error, setError] = useState(false)
    const [tasks, setTask] = useState([])
    const [updateId, setUpdateId] = useState('')

    useEffect(() => {
        async function get() {
            const { data } = await axios.get("http://localhost:5000/api/v1/items")
            setTask(data.task)
        }
        get()


    }, [])

    const handleSubmit = async (e) => {
        try {
            setError(false)
            e.preventDefault();
            if (postContent.title == "" || postContent.description == "") {
                setError(true)
                return
            }
            let post = { ...postContent }
            if (updateId) {
                post = { ...postContent, _id: updateId }
                const { data } = await axios.put(`http://localhost:5000/api/v1/items/${updateId}`, post)
                if (data.success) {
                    toast.success(data.message);
                }

                const updatedtasks = tasks.map(elem => {
                    if (elem._id === updateId) {
                        return post;
                    }
                    return elem;
                });
                setTask(updatedtasks)
                setTaskContent({ title: "", description: "" });
                setUpdateId("")
                return
            }
            const { data } = await axios.post("http://localhost:5000/api/v1/items", post)
            setTask([data.task, ...tasks])
            if (data.success) {
                toast.success(data.message);
            }
            setTaskContent({ title: "", description: "" });

        }
        catch (err) {
            console.error(err)
            toast.error("something went wrong")
        }

    };


    async function deleteHandler(id) {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/items/${id}`)
            if (data.success) {
                toast.success(data.message);
            }
            let postData = tasks.filter((elem) => {
                return elem._id != id
            })
            setTask(postData)
        } catch (err) {
            console.error(err)
            toast.error("something went wrong")
        }

    }

    async function updateHandler(post) {
        try {
            window.scroll(0, 0);
            setTaskContent({ title: post.title, description: post.description })
            setUpdateId(post._id)
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    }

    async function toggleCompletedHandler(id) {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/v1/complete-items/${id}`)
            if (data.success) {
                toast.success(data.message);
            }
            let taskData = tasks.map((elem) => {
                if (elem._id === id) {
                    return { ...elem, isCompleted: true };
                }
                return elem;
            });
            setTask(taskData);
        } catch (err) {
            console.error(err)
            toast.error("something went wrong")
        }

    }

    console.log(tasks)


    return (
        <>
            <div className="add-post-box">
                <ToastContainer />
                <h3>Add a New Task</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={(e) => { setTaskContent({ ...postContent, title: e.target.value }) }} value={postContent.title} placeholder='Add title'></input>
                    {error && postContent.title == "" && <div style={{ color: "red" }}> title is required</div>}
                    <textarea
                        value={postContent.description}
                        onChange={(e) => { setTaskContent({ ...postContent, description: e.target.value }) }}
                        placeholder="Add description"
                    ></textarea>
                    {error && postContent.description == "" && <div style={{ color: "red" }}> description is required</div>}



                    {updateId ? <button type="submit">Update Task</button> : <button type="submit">Add Task</button>}
                </form>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <table style={{ width: '80%', borderCollapse: 'collapse', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f7f7f7' }}>
                            <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Title</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Description</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Status</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.length > 0 ? tasks.map((elem) => (
                            <tr key={elem._id} style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={e => e.currentTarget.style.backgroundColor = ''}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>{elem.title}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>{elem.description}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: elem.isCompleted ? '#4CAF50' : '#FF5722' }}>
                                    {elem.isCompleted ? "Completed" : "Not Completed"}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>
                                    <button style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { deleteHandler(elem._id) }}>Delete</button>
                                    <button style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { updateHandler(elem) }}>Update</button>
                                    <button style={{ padding: '5px 10px', backgroundColor: elem.isCompleted ? '#888888' : '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { toggleCompletedHandler(elem._id) }}>
                                        {elem.isCompleted ? "Unmark" : "Mark As Completed"}
                                    </button>
                                </td>
                            </tr>
                        )) :
                            <tr>
                                <td colSpan="4" style={{ padding: '10px', textAlign: 'center', color: '#888888' }}>
                                    No tasks available.
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>


        </>
    );
}

export default AddPostBox;
