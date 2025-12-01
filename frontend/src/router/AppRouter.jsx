import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext)
    if (!token) return <Navigate to="/login" replace />
    return children
}

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard/*"
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
