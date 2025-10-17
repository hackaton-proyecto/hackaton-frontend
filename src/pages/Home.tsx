import { motion } from "framer-motion"
import { Container } from "../components/Container"
import { ShowcaseCards } from "../components/ShowcaseCards"
import { FloatingActionButton } from "./../components/SumitEmpre"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-indigo-50" />

        <Container className="py-20 sm:py-24">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Capital - Conecta Inversores y Emprendedores
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Plataforma dedicada a conectar inversores con emprendedores. Regístrate
              para descubrir oportunidades de inversión o presentar tu proyecto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ShowcaseCards />
          </motion.div>
        </Container>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FloatingActionButton />
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Footer />
      </motion.div>
    </>
  )
}

export default Home
