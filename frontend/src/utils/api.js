const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export async function request(path, { method = 'GET', body, token } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(API_BASE + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })

    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
        const error = new Error(data?.message || 'API request failed')
        error.status = res.status
        error.data = data
        throw error
    }
    return data
}
