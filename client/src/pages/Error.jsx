import { useNavigate } from 'react-router-dom'

const Error = () => {

// to navigate on the page where we got the error
  const navigate = useNavigate()

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-xl">
        <img
          src="/images/error.avif"
          alt="404 Error"
          className="mx-auto w-80 mb-8"
        />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </section>
  )
}

export default Error;