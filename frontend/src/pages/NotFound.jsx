import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="text-center py-12">
            <h2 className="text-3xl font-bold mb-2">404 — Page not found</h2>
            <p className="mb-4">The page you looked for does not exist.</p>
            <Link to="/" className="text-teal-600">Go home</Link>
        </section>
    )
}
