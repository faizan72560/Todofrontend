import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Home = () => {
    const [task, setTask] = useState([])
    useEffect(() => {
        async function get() {
            const { data } = await axios.get("http://localhost:5000/api/v1/items")

            setTask(data.task)
        }
        get()


    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <table style={{ width: '80%', borderCollapse: 'collapse', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f7f7f7' }}>
                        <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Title</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Description</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid #e0e0e0' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {task && task.length > 0 ? task.map((elem) => (
                        <tr key={elem._id} style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={e => e.currentTarget.style.backgroundColor = ''}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>{elem.title}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>{elem.description}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: elem.isCompleted ? '#4CAF50' : '#FF5722' }}>
                                {elem.isCompleted ? "Completed" : "Not Completed"}
                            </td>
                        </tr>
                    )) :
                        <tr>
                            <td colSpan="3" style={{ padding: '10px', textAlign: 'center', color: '#888888' }}>
                                Add The Task To View
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Home