import { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { request } from '../utils/api'
import { fetchWeatherByCity } from '../utils/weatherApi'
import Loader from '../components/Loader'
import WeatherCard from '../components/WeatherCard'
import NoteCard from '../components/NoteCard'

export default function Dashboard() {
    const { token, user } = useAuth() 
    const [notes, setNotes] = useState([])
    const [loadingNotes, setLoadingNotes] = useState(true)
    const [error, setError] = useState(null)
    const [city, setCity] = useState('Gandhinagar')
    const [weather, setWeather] = useState(null)
    const [weatherLoading, setWeatherLoading] = useState(false)
    const searchRef = useRef()
    const titleRef = useRef()
    const contentRef = useRef()
    const [editing, setEditing] = useState(null)

    const loadNotes = async () => {
        setLoadingNotes(true)
        try {
            const data = await request('/api/notes', { token })
            setNotes(data)
        } catch (err) {
            setError(err.message || 'Could not load notes')
        } finally {
            setLoadingNotes(false)
        }
    }

    useEffect(() => {
        if (!token) return
        loadNotes()
    }, [token])

    const loadWeather = async (name) => {
        setWeatherLoading(true)
        try {
            const data = await fetchWeatherByCity(name)
            setWeather(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setWeatherLoading(false)
        }
    }

    useEffect(() => {
        loadWeather(city)
    }, [])

    const handleSearchCity = (e) => {
        e.preventDefault()
        const q = searchRef.current.value.trim()
        if (!q) return
        setCity(q)
        loadWeather(q)
    }

    const handleCreateNote = async (e) => {
        e.preventDefault()
        const title = titleRef.current.value.trim()
        const content = contentRef.current.value.trim()
        if (!title || !content) return
        try {
            const newNote = await request('/api/notes', { method: 'POST', body: { title, content }, token })
            setNotes(prev => [newNote, ...prev])
            titleRef.current.value = ''
            contentRef.current.value = ''
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this note?')) return
        try {
            await request(`/api/notes/${id}`, { method: 'DELETE', token })
            setNotes(prev => prev.filter(n => n._id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    const handleEdit = (note) => {
        setEditing(note)
        titleRef.current.value = note.title
        contentRef.current.value = note.content
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        if (!editing) return
        const title = titleRef.current.value.trim()
        const content = contentRef.current.value.trim()
        if (!title || !content) return
        try {
            const updated = await request(`/api/notes/${editing._id}`, { method: 'PUT', body: { title, content }, token })
            setNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)))
            setEditing(null)
            titleRef.current.value = ''
            contentRef.current.value = ''
        } catch (err) {
            setError(err.message)
        }
    }

    const handleCancelEdit = () => {
        setEditing(null)
        titleRef.current.value = ''
        contentRef.current.value = ''
    }

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <section aria-labelledby="notes-heading">
                        <h2 id="notes-heading" className="text-xl font-medium mb-2">Your Notes</h2>
                        <form onSubmit={editing ? handleSaveEdit : handleCreateNote} className="bg-white p-4 rounded shadow space-y-3">
                            <div>
                                <label className="block text-sm">Title</label>
                                <input ref={titleRef} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm">Content</label>
                                <textarea ref={contentRef} rows="3" className="w-full p-2 border rounded"></textarea>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-teal-600 text-white px-3 py-1 rounded" type="submit">
                                    {editing ? 'Save' : 'Add Note'}
                                </button>
                                {editing && <button type="button" onClick={handleCancelEdit} className="px-3 py-1 border rounded">Cancel</button>}
                            </div>
                        </form>

                        <div className="mt-4 space-y-3">
                            {loadingNotes ? <Loader /> : notes.length ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {notes.map(n => (
                                        <NoteCard key={n._id} note={n} onDelete={handleDelete} onEdit={handleEdit} />
                                    ))}
                                </div>
                            ) : <p className="text-slate-500">No notes yet.</p>}
                        </div>
                    </section>
                </div>

                <aside className="space-y-4">
                    <section className="bg-white p-4 rounded shadow">
                        <h3 className="font-medium mb-2">Weather</h3>
                        <form onSubmit={handleSearchCity} className="flex gap-2 mb-3">
                            <input ref={searchRef} defaultValue={city} className="flex-1 p-2 border rounded" placeholder="City name" />
                            <button className="px-3 py-1 bg-teal-600 text-white rounded">Search</button>
                        </form>
                        {weatherLoading ? <Loader /> : weather ? <WeatherCard data={weather} /> : <p className="text-slate-500">No weather data</p>}
                    </section>

                    <section className="bg-white p-3 rounded shadow">
                        <h3 className="font-medium mb-2">Profile</h3>
                        <p className="text-sm">Name: <span className="font-medium">{user?.name}</span></p>
                        <p className="text-sm">Email: <span className="font-medium">{user?.email}</span></p>
                    </section>
                </aside>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}
        </section>
    )
}
