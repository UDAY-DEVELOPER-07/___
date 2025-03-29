import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/bg.jpg';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
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
            setError("Failed to fetch users");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setSuccess("User deleted successfully!");
        } catch {
            setError("Failed to delete user.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://reqres.in/api/users/${editUser.id}`, editUser);
            setUsers(users.map(u => u.id === editUser.id ? editUser : u));
            setSuccess("User updated successfully!");
            setEditUser(null);
        } catch {
            setError("Failed to update user.");
        }
    };

    return (
        <div 
            className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-6"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Header */}
            <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between border border-black items-center mb-6 bg-black bg-opacity-50 p-4 rounded-xl space-y-2 sm:space-y-0">
                <h2 className="text-2xl text-white font-extrabold">Users List</h2>
                <button 
                    onClick={() => { localStorage.removeItem('token'); navigate('/'); }} 
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
                >
                    Logout
                </button>
            </div>

            {success && <p className="text-green-500 mb-2">{success}</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user.id} className="bg-transparent bg-opacity-20 backdrop-blur-md border border-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-2">
                        <img src={user.avatar} className="w-24 h-24 border-2 border-white rounded-full" alt="avatar" />
                        <h3 className="text-lg text-white font-bold">{user.first_name} {user.last_name}</h3>
                        <p className="text-sm text-gray-200">{user.email}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setEditUser(user)}
                                className="bg-green-400 font-bold hover:bg-green-500 text-white px-3 py-1 rounded transition duration-300"
                            >Edit</button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded transition duration-300"
                            >Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-6">
                <button 
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 transition duration-300"
                >
                    Previous
                </button>
                <span className='text-white'>{page} / {totalPages}</span>
                <button 
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 transition duration-300"
                >
                    Next
                </button>
            </div>

            {editUser && (
                <div className="fixed  inset-0 bg-black bg-opacity-90 flex justify-center items-center px-4">
                    <div className="bg-transparent border border-white backdrop-blur-3xl p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
                        <h3 className="text-2xl text-white  font-extrabold ">Edit User</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <input type="text" value={editUser.first_name}
                                onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                                className="w-full border rounded p-2" placeholder="First Name" />
                            <input type="text" value={editUser.last_name}
                                onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                                className="w-full border rounded p-2" placeholder="Last Name" />
                            <input type="email" value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                className="w-full border rounded p-2" placeholder="Email" />
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setEditUser(null)}
                                    className="bg-gray-400 text-white font-bold px-3 py-1 rounded">Cancel</button>
                                <button type="submit"
                                    className="bg-green-500 text-white font-bold px-3 py-1 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;
