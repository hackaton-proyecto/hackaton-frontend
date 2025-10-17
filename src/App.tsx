import { AuthProvider } from './context/AuthContext'

import { Router } from './router'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      
        <main className="flex-1">
          <Router />
        </main>
      
      </div>
    </AuthProvider>
  )
}

export default App
