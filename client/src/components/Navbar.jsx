import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';

export default function Navbar() {
  const { isLoggIn, user } = useAuth();

  // Active link style
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-700 border-b-2 border-blue-700 pb-1 font-semibold'
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 transition pb-1';

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          <p className="text-xl">
            Welcome,
            <span className="font-semibold text-blue-600">
              {user ? ` ${user.username}` : ``}
            </span>{' '}
            to our website
          </p>
        </NavLink>
        <div className="flex space-x-4 items-center">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>

          {isLoggIn ? (
            <>
              <NavLink to="/logout" className={navLinkClass}>Logout</NavLink>

              {/* ✅ Only show Admin link if user isAdmin */}
              {user?.isAdmin && (
                <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass}>Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
