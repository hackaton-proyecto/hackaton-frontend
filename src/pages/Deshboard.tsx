import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Container } from '../components/Container'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

ChartJS.register(ArcElement, Tooltip, Legend)

const proyectos = [
  { id: 1, rubro: 'Tecnologia' },
  { id: 2, rubro: 'Agroindustria' },
  { id: 3, rubro: 'Tecnologia' },
  { id: 4, rubro: 'Comercio' },
  { id: 5, rubro: 'Finanzas' },
  { id: 6, rubro: 'Tecnologia' },
  { id: 7, rubro: 'Salud' },
  { id: 8, rubro: 'Produccion' },
  { id: 9, rubro: 'Agroindustria' },
  { id: 10, rubro: 'Inteligencia Artificial' },
  { id: 11, rubro: 'Tecnologia' },
  { id: 12, rubro: 'VideoJuegos' },
  { id: 13, rubro: 'Turismo' },
  { id: 14, rubro: 'Finanzas' },
  { id: 15, rubro: 'Tecnologia' },
]

const preferenciasInversores = [
  { inversorId: 1, rubro: 'Tecnologia' },
  { inversorId: 2, rubro: 'Finanzas' },
  { inversorId: 3, rubro: 'Tecnologia' },
  { inversorId: 4, rubro: 'Agroindustria' },
  { inversorId: 5, rubro: 'Inteligencia Artificial' },
  { inversorId: 6, rubro: 'Tecnologia' },
  { inversorId: 7, rubro: 'Salud' },
  { inversorId: 8, rubro: 'Tecnologia' },
  { inversorId: 9, rubro: 'Finanzas' },
  { inversorId: 10, rubro: 'VideoJuegos' },
  { inversorId: 11, rubro: 'Tecnologia' },
]

// Función para contar ocurrencias
const contarOcurrencias = (lista: { rubro: string }[]) => {
  return lista.reduce((acc, item) => {
    acc[item.rubro] = (acc[item.rubro] || 0) + 1
    return acc
  }, {} as { [key: string]: number })
}

const conteoProyectos = contarOcurrencias(proyectos)
const conteoInversores = contarOcurrencias(preferenciasInversores)

const chartColors = [
  '#0d3b66',
  '#faf0ca',
  '#f4d35e',
  '#ee964b',
  '#f95738',
  '#a3a3a3',
  '#7b9e89',
  '#c26e6e',
  '#5c6e8f',
  '#3e5c76',
  '#1d2d44',
  '#d9d9d9',
]

export const dataProyectos = {
  labels: Object.keys(conteoProyectos),
  datasets: [
    {
      label: 'Nº de Proyectos',
      data: Object.values(conteoProyectos),
      backgroundColor: chartColors,
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
}

export const dataInversores = {
  labels: Object.keys(conteoInversores),
  datasets: [
    {
      label: 'Nº de Inversores',
      data: Object.values(conteoInversores),
      backgroundColor: chartColors.slice().reverse(),
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
}

export function Dashboard() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen">
        <Container className="py-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Dashboard General
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Distribución de Proyectos por Rubro
              </h2>
              <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <Pie data={dataProyectos} />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Rubros más Elegidos por Inversores
              </h2>
              <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <Pie data={dataInversores} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
