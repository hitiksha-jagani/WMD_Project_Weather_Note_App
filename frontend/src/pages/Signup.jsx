import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { request } from '../utils/api'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const data = await request('/api/auth/register', { method: 'POST', body: { name, email, password } })
            login({ token: data.token, user: { _id: data._id, name: data.name, email: data.email } })
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                <div>
                    <label className="block text-sm">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full mt-1 p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="w-full mt-1 p-2 border rounded" />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <div className="flex items-center justify-between">
                    <button className="bg-teal-600 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? 'Creating...' : 'Create account'}
                    </button>
                </div>
            </form>
        </section>
    )
}
