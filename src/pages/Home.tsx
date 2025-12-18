import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Home</h1>
        <Link
          to="/vault/security-tutorial"
          className="text-blue-600 hover:text-blue-800 underline text-lg"
        >
          Go to Vault Security Tutorial
        </Link>
      </div>
    </div>
  )
}


