import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'
import {toast} from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const {storeTokenInLS, API} = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleLoginInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const res_data = await response.json()
      console.log((res_data.message)); 

      if (response.ok) {
        storeTokenInLS(res_data.token)

        toast.success("Login Successfully")
        setUser({
          email: "",
          password: ""
        })
        navigate("/")

      }else{
        toast.error(res_data.message)
      }

    } catch (error) {
      toast.error("Login Error: ", error)
    }

  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="max-w-5xl w-full bg-white p-8 shadow-xl rounded-xl grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src="/images/login.png"
            alt="Let's fill the login form"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
            Login Form
          </h1>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleLoginInput}
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
                onChange={handleLoginInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}

export default Login
