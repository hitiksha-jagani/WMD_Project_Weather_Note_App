import React from 'react'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <AppRouter />
      </main>
    </div>
  )
}
