import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUsers(page);
        }
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    // const handleedit = asyn (e) => {
    //     e.pagedefault
    //     try{
    //         const response = await axios.put('https://reqres.in/api/users', {
    //             email,
    //             password
    //         });
    //     } catch (error) {
    //         console.error("Failed to edit user", error);
    //     };
     return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users List</h2>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <img src={user.avatar} alt={`${user.first_name}`} className="w-24 h-24 rounded-full mb-4" />
                        <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className='flex justify-center space-x-4'>
                        <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  rounded mt-4"
                        
                        >
                            Edit</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">
                            Delete</button>
                            </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="flex items-center">{page} / {totalPages}</span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;
