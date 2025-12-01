import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
    const { token, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-teal-600 text-white">
            <nav className="container mx-auto p-4 flex items-center justify-between">
                <div>
                    <Link to="/" className="text-xl font-semibold">WeatherNotes</Link>
                </div>
                <ul className="flex items-center gap-4">
                    {token ? (
                        <>
                            <li>Hello, <span className="font-medium">{user?.name}</span></li>
                            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                            <li>
                                <button className="bg-white text-teal-600 px-3 py-1 rounded" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="hover:underline">Login</Link></li>
                            <li><Link to="/signup" className="hover:underline">Sign up</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
