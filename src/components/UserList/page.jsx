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
        <div className="min-h-screen bg-gray-100 p-8 pt-0 mt-0" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className=" flex  items-center justify-center  flex-col h-screen w-full  backdrop-blur-sm">
                <div className="flex justify-between flex-row items-center w-full mb-6">
                    <h2 className="text-2xl text-white font-bold">Users List</h2>
                    <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
                </div>

                {success && <p className="text-green-500 mb-2">{success}</p>}
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                    {users.map(user => (
                        <div key={user.id} className="bg-transparent border-2 border-black shadow-black p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
                            <img src={user.avatar} className="w-24 h-24 rounded-full" alt="avatar" />
                            <h3 className="text-lg text-yellow-50 font-semibold">{user.first_name} {user.last_name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setEditUser(user)}
                                    className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded"
                                >Edit</button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center space-x-4 mt-6">
                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50">
                        Previous
                    </button>
                    <span className='text-white'>{page} / {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>

                {editUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-lg">
                            <h3 className="text-xl font-bold">Edit User</h3>
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
                                        className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                                    <button type="submit"
                                        className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
