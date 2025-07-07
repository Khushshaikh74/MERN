import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify'

const Register = () => {

  const navigate = useNavigate()

  const {storeTokenInLS, API} = useAuth()

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  })

  const handleRegisterInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const res_data = await response.json()
      //console.log((res_data.message));
      
      if (response.ok) {
        storeTokenInLS(res_data.token)
        
        toast.success("Register Successfully")
        setUser({
          username: '',
          email: '',
          phone: '',
          password: '',
        })
        navigate("/login")
      }else{
        toast.error(res_data.message)
      }

    } catch (error) {
      toast.error("Registeration Error : ", error)
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="max-w-6xl w-full bg-white p-8 shadow-xl rounded-xl grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src="/images/register.png"
            alt="a girl is trying to do registration"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
            Registration Form
          </h1>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleRegisterInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleRegisterInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone"
                required
                autoComplete="off"
                value={user.phone}
                onChange={handleRegisterInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleRegisterInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}

export default Register
