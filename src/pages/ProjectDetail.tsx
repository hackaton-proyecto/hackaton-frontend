import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "../components/Container"
import { demoData } from "../components/ShowcaseCards"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, Text, Metric, Badge } from "@tremor/react"
import { useAuth } from "../context/AuthContext"
import { navigate } from "../router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

function getQueryParam(name: string): string | null {
  const hash = window.location.hash || ""
  const queryIndex = hash.indexOf("?")
  if (queryIndex === -1) return null
  const queryString = hash.substring(queryIndex + 1)
  const params = new URLSearchParams(queryString)
  return params.get(name)
}

export function ProjectDetail() {
  const { user, initialized } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!initialized) return
    if (!user) {
      alert("Por favor inicie sesión para poder ver los proyectos disponibles")
      navigate("/login")
    } else {
      setReady(true)
    }
  }, [initialized, user])

  const id = useMemo(() => getQueryParam("id") || "", [])
  const item = useMemo(() => {
    try {
      const raw = localStorage.getItem("projects")
      if (raw) {
        const list = JSON.parse(raw) as any[]
        const found = list.find((p) => p.id === id)
        if (found) return found
      }
    } catch {}
    return demoData.find((d) => d.id === id)
  }, [id])

  const images = useMemo(() => {
    if (!item) return [] as string[]
    if (Array.isArray((item as any).images) && (item as any).images.length > 0)
      return (item as any).images as string[]
    if ((item as any).cover) return [(item as any).cover as string]
    return [] as string[]
  }, [item])

  if (!ready) return null

  if (!item) {
    return (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Navbar />
        </motion.div>
        <Container className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900">Proyecto no encontrado</h1>
            <p className="mt-4 text-gray-600">El proyecto solicitado no existe o fue removido.</p>
          </motion.div>
        </Container>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <Footer />
        </motion.div>
      </>
    )
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Navbar />
      </motion.div>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-indigo-50" />
        <Container className="py-12 sm:py-16">
          <motion.div
            className="mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {(item as any).title || "Proyecto"}
            </h1>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
                  {images.length > 0 && <SteamCarousel images={images} />}
                  {images.length === 0 && (
                    <div className="flex h-60 w-full items-center justify-center bg-gray-100 text-gray-500">
                      Sin imágenes
                    </div>
                  )}
                  <div className="p-6">
                    <p className="leading-7 text-gray-700">{(item as any).description || ""}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <InvestmentCard projectId={id} />
                <div className="mt-6">
                  <InvestorsCard projectId={id} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <Footer />
      </motion.div>
    </>
  )
}

function formatCurrency(n: number) {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export function InvestmentCard({ projectId }: { projectId: string }) {
  const data: Record<string, { goal: number; raised: number }> = {
    "ultra-vertigo": { goal: 50000, raised: 18500 },
    "neon-run": { goal: 75000, raised: 32500 },
    "tower-dash": { goal: 60000, raised: 42000 },
  }
  const { goal, raised } = data[projectId] || { goal: 40000, raised: 12000 }

  const progress = Math.min(100, Math.round((raised / goal) * 100))
  const remaining = Math.max(0, goal - raised)

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
      <Card className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/90 shadow-lg">
        <div className="pointer-events-none absolute -top-16 -right-20 h-52 w-52 rounded-full bg-indigo-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl" />
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <span className="text-base">💸</span>
            </div>
            <Text className="text-gray-700">Meta de inversión</Text>
          </div>
          <Badge color="indigo" className="font-semibold">{progress}%</Badge>
        </div>
        <div className="mt-2">
          <Metric className="leading-tight">{formatCurrency(raised)}</Metric>
          <Text className="text-gray-600">
            de <span className="font-semibold">{formatCurrency(goal)}</span>
          </Text>
        </div>
        <div className="mt-5">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-indigo-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-white/0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <span>{progress}%</span>
            <span>
              {formatCurrency(raised)} de {formatCurrency(goal)}
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Faltan <span className="font-medium text-gray-700">{formatCurrency(remaining)}</span> para alcanzar la meta
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-lg bg-[oklch(27.9%_0.041_260.031)] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[oklch(32%_0.045_260.031)] active:scale-[0.99]"
          onClick={() => alert("Función de invertir - demo")}
        >
          Invertir
        </button>
      </Card>
    </motion.div>
  )
}

function InvestorsCard({ projectId }: { projectId: string }) {
  const data: Record<string, { investors: number; target: number }> = {
    "ultra-vertigo": { investors: 128, target: 300 },
    "neon-run": { investors: 94, target: 220 },
    "tower-dash": { investors: 153, target: 250 },
  }
  const { investors, target } = data[projectId] || { investors: 42, target: 150 }

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
      <Card className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/90 shadow-lg">
        <div className="pointer-events-none absolute -top-16 -right-20 h-52 w-52 rounded-full bg-indigo-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl" />
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <span className="text-base">👥</span>
            </div>
            <Text className="text-gray-700">Inversores</Text>
          </div>
          <Badge color="indigo" className="font-semibold">Total</Badge>
        </div>
        <div className="mt-2">
          <Metric className="leading-tight">{investors.toLocaleString("es-AR")}</Metric>
          <Text className="text-gray-600">participantes</Text>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <Text>
            Objetivo: <span className="font-semibold">{target.toLocaleString("es-AR")}</span>
          </Text>
          <Text className="mt-1">
            Faltan <span className="font-medium">{Math.max(0, target - investors).toLocaleString("es-AR")}</span> inversores para alcanzar el objetivo
          </Text>
        </div>
        <button
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[oklch(27.9%_0.041_260.031)] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[oklch(32%_0.045_260.031)] active:scale-[0.99]"
          onClick={() => navigate(`/chat?projectId=${projectId}`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4.913 2.658c.242-.192.54-.298.858-.298h12.458c.318 0 .616.106.858.298l-7.087 5.67a1.5 1.5 0 01-1.718 0L4.913 2.658z" />
            <path d="M3 6.004v10.493A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.497V6.004L13.587 12.2a3 3 0 01-3.174 0L3 6.004z" />
          </svg>
          <span>Chatear con el emprendedor</span>
        </button>
      </Card>
    </motion.div>
  )
}

function SteamCarousel({ images }: { images: string[] }) {
  const [main, setMain] = useState<any>(null)
  const [nav, setNav] = useState<any>(null)

  const NextArrow = (props: any) => (
    <button
      aria-label="Siguiente"
      className="!absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-xl shadow hover:bg-white"
      onClick={props.onClick}
      type="button"
    >
      ›
    </button>
  )

  const PrevArrow = (props: any) => (
    <button
      aria-label="Anterior"
      className="!absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-xl shadow hover:bg-white"
      onClick={props.onClick}
      type="button"
    >
      ‹
    </button>
  )

  const mainSettings = {
    asNavFor: nav as any,
    dots: false,
    arrows: true,
    infinite: images.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: images.length > 1,
    autoplaySpeed: 4500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  } as const

  const thumbsSettings = {
    asNavFor: main as any,
    focusOnSelect: true,
    slidesToShow: Math.min(6, images.length),
    swipeToSlide: true,
    arrows: true,
    infinite: false,
    centerMode: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(5, images.length) } },
      { breakpoint: 640, settings: { slidesToShow: Math.min(4, images.length) } },
    ],
  } as const

  return (
    <motion.div
      className="p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-md">
        <Slider ref={setMain} {...(mainSettings as any)}>
          {images.map((src, i) => (
            <div key={i}>
              <img src={src} alt={`slide-${i}`} className="h-80 w-full object-cover" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-3">
        <Slider ref={setNav} {...(thumbsSettings as any)}>
          {images.map((src, i) => (
            <div key={i} className="px-1">
              <img
                src={src}
                alt={`thumb-${i}`}
                className="h-20 w-full rounded-md object-cover ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-600"
              />
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  )
}

export default ProjectDetail
