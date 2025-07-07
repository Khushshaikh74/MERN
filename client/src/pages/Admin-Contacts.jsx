import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/Auth';
import ConfirmBox from '../components/Confirm-Box';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ✅ Modal state
  const { authorizationToken, API } = useAuth();

  const getAllContacts = async () => {
    try {
      const response = await fetch(`${API}/admin/contacts`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts);
      } else {
        toast.error(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      toast.error('Contact Fetch Error');
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/admin/contact/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Contact deleted successfully');
        getAllContacts();
      } else {
        toast.error(data.message || 'Failed to delete contact');
      }
    } catch (error) {
      toast.error('Something went wrong while deleting the contact');
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Contact Messages</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 text-base">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.length > 0 ? (
              contacts.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.username}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{item.email}</td>
                  <td className="px-6 py-4 text-gray-600">{item.message}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setConfirmDeleteId(item._id)}
                      className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 font-medium">
                  No contact messages found.
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
          message="Are you sure you want to delete this message? This action cannot be undone."
          onConfirm={() => {
            deleteContact(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default AdminContacts;
