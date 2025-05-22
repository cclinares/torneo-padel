import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function CrearPartido() {
  const [jugadores, setJugadores] = useState([])
  const [seleccionados, setSeleccionados] = useState([])

  const obtenerJugadores = async () => {
    const { data, error } = await supabase
      .from('jugadores')
      .select('*')
      .order('nombre', { ascending: true })

    if (!error) setJugadores(data)
  }

  useEffect(() => {
    obtenerJugadores()
  }, [])

  const toggleJugador = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((j) => j !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    )
  }

  const crearPartido = async () => {
    if (seleccionados.length !== 4) {
      alert('Debes seleccionar exactamente 4 jugadores.')
      return
    }

    const pareja1 = seleccionados.slice(0, 2)
    const pareja2 = seleccionados.slice(2, 4)

    const { error } = await supabase.from('partidos').insert([
      {
        pareja_1: pareja1,
        pareja_2: pareja2,
        puntos_1: 0,
        puntos_2: 0,
        ganador: null
      }
    ])

    if (error) {
      console.error(error)
      alert('Error al crear partido')
    } else {
      alert('Partido creado exitosamente ✅')
      setSeleccionados([])
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Crear Partido</h2>
      <p>Selecciona 4 jugadores (2 por pareja):</p>

      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
        {jugadores.map((j) => (
          <li
            key={j.id}
            onClick={() => toggleJugador(j.id)}
            style={{
              border: seleccionados.includes(j.id) ? '2px solid limegreen' : '1px solid gray',
              borderRadius: 6,
              padding: 10,
              margin: 5,
              cursor: 'pointer',
              width: 120,
              textAlign: 'center',
              background: seleccionados.includes(j.id) ? '#1e1e1e' : 'transparent',
            }}
          >
            {j.nombre}
          </li>
        ))}
      </ul>

      <button
        onClick={crearPartido}
        disabled={seleccionados.length !== 4}
        style={{ marginTop: 10 }}
      >
        Crear partido con estas parejas
      </button>
    </div>
  )
}
