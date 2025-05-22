import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ListaJugadores() {
  const [jugadores, setJugadores] = useState([])

  const obtenerJugadores = async () => {
    const { data, error } = await supabase
      .from('jugadores')
      .select('*')
      .order('creado_en', { ascending: false })

    if (!error) setJugadores(data)
  }

  useEffect(() => {
    obtenerJugadores()
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Jugadores Registrados</h2>

      {jugadores.length === 0 ? (
        <p>No hay jugadores aún.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {jugadores.map((j) => (
            <li key={j.id} style={{ marginBottom: 10 }}>
              <strong>{j.nombre}</strong> — {j.lado_juego} / {j.mano_habil}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
