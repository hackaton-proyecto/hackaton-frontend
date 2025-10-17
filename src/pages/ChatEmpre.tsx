import { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { navigate } from '../router'

// La función auxiliar no necesita cambios.
function getQueryParam(name: string): string | null {
  const hash = window.location.hash || ''
  const queryIndex = hash.indexOf('?')
  if (queryIndex === -1) return null
  const queryString = hash.substring(queryIndex + 1)
  const params = new URLSearchParams(queryString)
  return params.get(name)
}

type Message = {
  id: number
  text: string
  sender: 'user' | 'emprendedor'
  timestamp: string
}

const demoMessages: Message[] = [
  {
    id: 1,
    text: '¡Hola! Estoy muy interesado en el proyecto. ¿Podrían contarme más sobre el equipo detrás de la idea?',
    sender: 'user',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    text: '¡Hola! Claro, gracias por tu interés. Somos un equipo de dos desarrolladores y un diseñador con más de 5 años de experiencia en la industria de videojuegos.',
    sender: 'emprendedor',
    timestamp: '10:32 AM',
  },
]

export function Chat() {
  const projectId = useMemo(() => getQueryParam('projectId') || 'Proyecto Desconocido', [])
  const [messages, setMessages] = useState<Message[]>(demoMessages)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage('')

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'Hemos recibido tu mensaje. Te responderemos a la brevedad. ¡Gracias!',
        sender: 'emprendedor',
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  return (
    // Se ajustó el color de fondo para una apariencia más suave
    <div className="flex h-screen flex-col bg-gray-100">
      {/* El efecto "frosted glass" del header se mantiene para un look moderno */}
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
        <Container className="flex items-center justify-between py-3">
          <div>
            <h1 className="font-semibold text-gray-900">Chat con Emprendedor</h1>
            <p className="text-sm capitalize text-gray-600">{projectId.replace(/-/g, ' ')}</p>
          </div>
          <button
            onClick={() => navigate(`/project?id=${projectId}`)}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Volver
          </button>
        </Container>
      </header>

      {/* Se aumentó el espaciado para mayor legibilidad */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'emprendedor' && (
                // Avatar del emprendedor con colores neutros y refinados
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                  E
                </div>
              )}
              <div
                className={`max-w-lg rounded-2xl px-4 py-2.5 shadow-sm ${
                  msg.sender === 'user'
                    // Azul oscuro para los mensajes del usuario
                    ? 'rounded-br-lg bg-gray-800 text-white' 
                    // Gris claro para los mensajes del emprendedor para un mejor contraste
                    : 'rounded-bl-lg bg-white text-gray-800'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer mejorado con más espaciado y un estilo de input moderno */}
      <footer className="sticky bottom-0 z-10 border-t border-gray-200/80 bg-white/80 p-4 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              // Input con estilo de "píldora" para una apariencia más amigable
              className="w-full rounded-full border-transparent bg-gray-100 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              // Botón de envío con el nuevo color azul oscuro
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.492l-16-5.333z" />
              </svg>
            </button>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default Chat