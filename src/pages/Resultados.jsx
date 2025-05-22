import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Resultados() {
  const [jugadores, setJugadores] = useState([])
  const [partidos, setPartidos] = useState([])
  const [resultados, setResultados] = useState({})

  useEffect(() => {
    obtenerJugadores()
    obtenerPartidos()
  }, [])

  const obtenerJugadores = async () => {
    const { data, error } = await supabase.from('jugadores').select('*')
    if (!error) setJugadores(data)
  }

  const obtenerPartidos = async () => {
    const { data, error } = await supabase
      .from('partidos')
      .select('*')
      .order('fecha', { ascending: false })
    if (!error) setPartidos(data)
  }

  const nombresJugadores = (ids) => {
    return ids.map(id => {
      const jugador = jugadores.find(j => j.id === id)
      return jugador ? jugador.nombre : '—'
    }).join(' y ')
  }

  const actualizarPuntos = (partidoId, campo, valor) => {
    setResultados(prev => ({
      ...prev,
      [partidoId]: {
        ...prev[partidoId],
        [campo]: parseInt(valor)
      }
    }))
  }

  const guardarResultado = async (partidoId) => {
    const resultado = resultados[partidoId]
    if (!resultado?.puntos_1 || !resultado?.puntos_2) {
      alert('Faltan puntos')
      return
    }

    const partido = partidos.find(p => p.id === partidoId)
    const ganador =
      resultado.puntos_1 > resultado.puntos_2
        ? partido.pareja_1
        : resultado.puntos_2 > resultado.puntos_1
        ? partido.pareja_2
        : null

    const { error } = await supabase
      .from('partidos')
      .update({
        puntos_1: resultado.puntos_1,
        puntos_2: resultado.puntos_2,
        ganador
      })
      .eq('id', partidoId)

    if (error) {
      console.error(error)
      alert('Error al guardar resultado')
    } else {
      alert('Resultado guardado ✅')
      obtenerPartidos()
    }
  }

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleString('es-CL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Ingresar Resultados</h2>
      {partidos.length === 0 ? (
        <p>No hay partidos aún.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {partidos.map((p) => (
            <li key={p.id} style={{ marginBottom: 20, padding: 10, border: '1px solid gray', borderRadius: 6 }}>
              <strong>Pareja 1:</strong> {nombresJugadores(p.pareja_1)} <br />
              <strong>Pareja 2:</strong> {nombresJugadores(p.pareja_2)} <br />
              <small style={{ color: 'gray' }}>📅 {formatearFecha(p.fecha)}</small>
              <div style={{ marginTop: 10 }}>
                {p.ganador ? (
                  <>
                    <p>
                      🏆 <strong>Ganó:</strong> {nombresJugadores(p.ganador)}
                    </p>
                    <p>
                      <strong>Resultado:</strong> {p.puntos_1} - {p.puntos_2}
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      placeholder="Puntos P1"
                      style={{ width: 80 }}
                      onChange={(e) => actualizarPuntos(p.id, 'puntos_1', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Puntos P2"
                      style={{ width: 80, marginLeft: 10 }}
                      onChange={(e) => actualizarPuntos(p.id, 'puntos_2', e.target.value)}
                    />
                    <button
                      style={{ marginLeft: 10 }}
                      onClick={() => guardarResultado(p.id)}
                    >
                      Guardar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
