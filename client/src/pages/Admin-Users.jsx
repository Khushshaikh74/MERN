import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/Auth';
import ConfirmBox from '../components/Confirm-Box';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ✅ Modal state
    const { authorizationToken, API } = useAuth();

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${API}/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const data = await response.json();

            if (response.ok) {
                setUsers(data.users);
            } else {
                toast.error(data.message || "Failed to fetch users");
            }
        } catch (error) {
            toast.error("Something went wrong while fetching users");
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${API}/admin/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "User deleted successfully");
                getAllUsers(); // ✅ Refresh list after deletion
            } else {
                toast.error(data.message || "Failed to delete user");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting the user");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="p-8 bg-white rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">All Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 text-base">
                    <thead className="bg-blue-100 text-blue-800 font-semibold">
                        <tr>
                            <th className="px-6 py-4 text-left">Username</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                                            <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                                        </button>
                                        <button
                                            onClick={() => setConfirmDeleteId(user._id)} // ✅ Open modal
                                            className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500 font-medium">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ ConfirmBox rendered here */}
            {confirmDeleteId && (
                <ConfirmBox
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this user? This action cannot be undone."
                    onConfirm={() => {
                        deleteUser(confirmDeleteId);
                        setConfirmDeleteId(null);
                    }}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}
        </div>
    );
};

export default AdminUsers;
