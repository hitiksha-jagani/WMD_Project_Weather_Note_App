export default function Loader() {
    return (
        <div role="status" className="flex items-center justify-center p-4">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        </div>
    )
}
