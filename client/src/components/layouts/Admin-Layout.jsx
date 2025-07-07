import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { FcSelfServiceKiosk } from "react-icons/fc";
import { IoHome } from "react-icons/io5";

const AdminLayout = () => {
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 p-3 rounded-lg transition hover:bg-blue-100 ${
            isActive ? 'bg-blue-500 text-white' : 'text-gray-700'
        }`;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-5 space-y-4 border-r">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
                <nav className="space-y-2">
                    <li className="list-none">
                        <NavLink to="/admin/users" className={navLinkClass}>
                            <FaUser />
                            Users
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink to="/admin/contacts" className={navLinkClass}>
                            <GrContact />
                            Contacts
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink to="/services" className={navLinkClass}>
                            <FcSelfServiceKiosk />
                            Services
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink to="/" className={navLinkClass}>
                            <IoHome />
                            Home
                        </NavLink>
                    </li>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50">
                <div className="bg-white shadow-md p-6 rounded-xl mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    {/* Add dashboard stats or info here */}
                </div>

                {/* Render child route (e.g. users table) */}
                <div className="bg-white shadow-md p-6 rounded-xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
