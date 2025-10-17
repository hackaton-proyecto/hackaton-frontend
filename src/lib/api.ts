export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : (undefined as unknown as T)

  if (!res.ok) {
    const rawMessage = (data as any)?.message
    let message: string
    if (typeof rawMessage === 'string') message = rawMessage
    else if (Array.isArray(rawMessage)) message = rawMessage.join(' | ')
    else message = res.statusText || 'Error de red'
    throw new Error(message)
  }

  return data as T
}

export function get<T>(path: string) {
  return request<T>(path, { method: 'GET' })
}

export function post<T>(path: string, body?: any) {
  return request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined })
}

// 🔥 Nuevo endpoint para el chatbot (N8N)
export async function chatbot<T>(body: any): Promise<T> {
  const CHATBOT_URL = 'http://localhost:5678/webhook-test/chatbot-hook'
  const res = await fetch(CHATBOT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || 'Error al conectar con el chatbot')
  }

  return (await res.json()) as T
}

export const api = { request, get, post, chatbot }
