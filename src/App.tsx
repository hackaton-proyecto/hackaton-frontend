import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Router } from './router'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-dvh flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
