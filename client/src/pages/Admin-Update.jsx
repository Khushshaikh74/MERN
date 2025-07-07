import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
  const { authorizationToken } = useAuth();
  const [user, setUser] = useState({ username: "", email: "", phone: "" });
  const params = useParams();
  const navigate = useNavigate();

  // Fetch user by ID
  const getUpdateUserId = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to fetch user");
      }
    } catch (error) {
      toast.error("User Update Error");
    }
  };

  useEffect(() => {
    getUpdateUserId();
  }, []);

  // Handle input
  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated user
  const handleEditedForm = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || user.phone.length !== 10) {
      return toast.error("Please enter valid user details.");
    }

    try {
      const response = await fetch(`${API}/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User updated successfully");
        navigate('/admin/users');
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the user");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit User</h2>

        <form onSubmit={handleEditedForm} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter username"
              name='username'
              value={user.username}
              onChange={handleUpdateInput}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter email"
              name='email'
              value={user.email}
              onChange={handleUpdateInput}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter phone number"
              maxLength="10"
              name='phone'
              value={user.phone}
              onChange={handleUpdateInput}
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
