const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY
const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5'

export async function fetchWeatherByCity(city) {
    if (!OPENWEATHER_KEY) throw new Error('Missing OpenWeatherMap API key in .env')
    const url = `${OPENWEATHER_BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    if (!res.ok) {
        const msg = data?.message || 'Weather fetch failed'
        throw new Error(msg)
    } 
    return data
}
