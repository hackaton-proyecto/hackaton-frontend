import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { navigate } from '../router'

export type ShowcaseItem = {
  id: string
  title: string
  description: string
  cover: string
  category?: string
  images?: string[]
}

export const demoData: ShowcaseItem[] = [
  {
    id: 'ultra-vertio',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-ru',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-verti',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-r',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-vert',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-ve',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'ne-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-ertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neorun',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-vtigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'nn-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ura-vertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-rn',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-+',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'n,n-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultraertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-n',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-rtigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-un',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-tigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-n',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-rtigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-vertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-vertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
   {
    id: 'ultra-vertigo',
    title: 'ULTRA VERTIGO',
    description:
      'Plataforma desafiante sobre correr, saltar y volver a intentar. Una torre minimalista con estilo visual para presentar a inversores.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'neon-run',
    title: 'NEON RUN',
    description:
      'Estética neón y niveles modulares. Ideal para explicar el loop de juego y la propuesta de valor.',
    cover:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
  },
]

const categoryOf = (it: ShowcaseItem): string => {
  if (it.category) return it.category
  if (it.id === 'ultra-vertigo') return 'Tecnología'
  if (it.id.startsWith('neon-run')) return 'Entretenimiento'
  return 'Industria'
}

export function ShowcaseCards({ items = demoData }: { items?: ShowcaseItem[] }) {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [extra, setExtra] = useState<ShowcaseItem[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const perPage = 20

  useEffect(() => {
    try {
      const raw = localStorage.getItem('projects')
      if (raw) {
        const list = JSON.parse(raw) as any[]
        const mapped: ShowcaseItem[] = list.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description || '',
          cover: p.cover || (Array.isArray(p.images) ? p.images[0] : ''),
          category: p.category || 'General',
        }))
        setExtra(mapped)
      }
    } catch {
      setExtra([])
    }

    try {
      const savedLikes = JSON.parse(localStorage.getItem('likes') || '[]')
      setLikes(savedLikes)
    } catch {
      setLikes([])
    }
  }, [])

  const toggleLike = (id: string) => {
    let updatedLikes: string[]
    if (likes.includes(id)) {
      updatedLikes = likes.filter((likeId) => likeId !== id)
    } else {
      updatedLikes = [...likes, id]
    }
    setLikes(updatedLikes)
    localStorage.setItem('likes', JSON.stringify(updatedLikes))
  }

  const list = useMemo(() => [...extra, ...items], [extra, items])
  const totalPages = useMemo(() => Math.max(1, Math.ceil(list.length / perPage)), [list.length])
  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage
    return list.slice(start, start + perPage)
  }, [list, page])

  const handleOpen = (id: string) => {
    if (!user) {
      alert('Por favor inicie sesión para poder ver los proyectos disponibles')
      try {
        localStorage.setItem('post_login_redirect', `/project?id=${id}`)
      } catch {}
      navigate('/login')
      return
    }
    const url = `/project?id=${encodeURIComponent(id)}`
    navigate(url)
  }

  return (
    <div>
      <div className="showcase-list">
        {pageItems.map((item, idx) => (
          <article
            key={`${item.id}-${idx}`}
            className={`showcase-card ${idx % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="showcase-left">
              <img className="showcase-cover" src={item.cover} alt={item.title} />
            </div>

            <div className="showcase-content">
              <h3 className="showcase-title">{item.title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                {categoryOf(item)}
              </p>
              <p className="showcase-desc mb-3">{item.description}</p>

              <div className="flex gap-3">
                <button
                  className="px-3 py-1 rounded-md text-sm border border-gray-400 text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 transition"
                  onClick={() => toggleLike(item.id)}
                >
                  {likes.includes(item.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="gray"
                      strokeWidth={1.5}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )}
                  {likes.includes(item.id) ? 'Interesado' : 'Mostrar interés'}
                </button>

                <button
                  className="px-3 py-1 rounded-md text-sm border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition"
                  onClick={() => handleOpen(item.id)}
                >
                  ↑ Ver proyecto
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {items.length > perPage && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            className="rounded-md border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`rounded-md px-3 py-1 text-sm ${
                n === page ? 'bg-blue-900 text-white' : 'border'
              }`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}

          <button
            className="rounded-md border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default ShowcaseCards
