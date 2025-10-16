import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

type UsersChartProps = {
  title?: string
}

export function UsersChart({ title = 'Usuarios (demo)' }: UsersChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    // Demo data: replace with real data when backend is ready
    const data = {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Altas por día',
          data: [5, 9, 3, 7, 4, 8, 6],
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: 'rgb(79, 70, 229)',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: title },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [title])

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <canvas ref={canvasRef} height={120} />
    </div>
  )
}

