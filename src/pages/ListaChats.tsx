import { Container } from '../components/Container'
import { navigate } from '../router'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

type ChatSummary = {
  projectId: string
  projectName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  avatarInitial: string
}

const demoChats: ChatSummary[] = [
  {
    projectId: 'eco-game-studios',
    projectName: 'IA de alexis',
    lastMessage: '¡Hola! Claro, gracias por tu interés...',
    timestamp: '10:32 AM',
    unreadCount: 0,
    avatarInitial: 'E',
  },
  {
    projectId: 'tech-innovators',
    projectName: 'Tech Innovators',
    lastMessage: 'Perfecto, envíanos la propuesta y la revisamos.',
    timestamp: 'Ayer',
    unreadCount: 2,
    avatarInitial: 'T',
  },
  {
    projectId: 'arte-digital-creativo',
    projectName: 'Arte Digital Creativo',
    lastMessage: '¿Podríamos agendar una llamada para mañana?',
    timestamp: '14/10',
    unreadCount: 0,
    avatarInitial: 'A',
  },
  {
    projectId: 'salud-bienestar-app',
    projectName: 'Salud & Bienestar App',
    lastMessage: 'Recibido, muchas gracias.',
    timestamp: '12/10',
    unreadCount: 0,
    avatarInitial: 'S',
  },
]

export function ChatList() {
  const handleChatSelect = (projectId: string) => {
    navigate(`/chat?projectId=${projectId}`)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
          <Container className="py-4">
            <h1 className="text-xl font-bold text-gray-900">Conversaciones</h1>
          </Container>
        </header>

        <main className="py-6">
          <Container>
            <div className="mx-auto max-w-3xl space-y-2">
              {demoChats.map((chat) => (
                <article
                  key={chat.projectId}
                  onClick={() => handleChatSelect(chat.projectId)}
                  className="flex cursor-pointer items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gray-200">
                    <span className="text-xl font-semibold text-gray-600">
                      {chat.avatarInitial}
                    </span>
                  </div>

                  <div className="flex-grow overflow-hidden">
                    <h2 className="font-semibold text-gray-800 truncate">{chat.projectName}</h2>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5 self-start">
                    <time className="text-xs font-medium text-gray-500">{chat.timestamp}</time>
                    {chat.unreadCount > 0 && (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-gray-800 text-xs font-bold text-white">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default ChatList