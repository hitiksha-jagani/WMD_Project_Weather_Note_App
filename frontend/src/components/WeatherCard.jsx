export default function WeatherCard({ data }) {
    if (!data) return null;

    const { name, main, weather } = data;

    return (
        <article className="bg-white shadow rounded p-4 w-full max-w-sm">
            <header className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className="text-sm">{weather?.[0]?.main}</span>
            </header>
            <div>
                <p className="text-4xl font-bold">{Math.round(main?.temp)}°C</p>
                <p className="text-sm text-slate-500">Feels like {Math.round(main?.feels_like)}°C</p>
            </div>
        </article>
    )
}
