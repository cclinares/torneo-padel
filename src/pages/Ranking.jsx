import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Ranking() {
  const [jugadores, setJugadores] = useState([])
  const [partidos, setPartidos] = useState([])
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    obtenerJugadores()
    obtenerPartidos()
  }, [])

  useEffect(() => {
    if (jugadores.length > 0 && partidos.length > 0) {
      calcularRanking()
    }
  }, [jugadores, partidos])

  const obtenerJugadores = async () => {
    const { data, error } = await supabase.from('jugadores').select('*')
    if (!error) setJugadores(data)
  }

  const obtenerPartidos = async () => {
    const { data, error } = await supabase.from('partidos').select('*')
    if (!error) setPartidos(data)
  }

  const calcularRanking = () => {
    const contador = {}
    const jugados = {}
    const derrotas = {}

    partidos.forEach((p) => {
      if (!p.pareja_1 || !p.pareja_2) return
      p.pareja_1.concat(p.pareja_2).forEach((id) => {
        jugados[id] = (jugados[id] || 0) + 1
      })
      if (!p.ganador) return
      p.ganador.forEach((id) => {
        contador[id] = (contador[id] || 0) + 1
      })
      const perdedores = p.pareja_1.concat(p.pareja_2).filter((id) => !p.ganador.includes(id))
      perdedores.forEach((id) => {
        derrotas[id] = (derrotas[id] || 0) + 1
      })
    })

    const listado = jugadores.map((j) => {
      const victorias = contador[j.id] || 0
      const total = jugados[j.id] || 0
      const defeats = derrotas[j.id] || 0
      const porcentaje = total > 0 ? Math.round((victorias / total) * 100) : 0
      return {
        id: j.id,
        nombre: j.nombre,
        victorias,
        derrotas: defeats,
        jugados: total,
        porcentaje
      }
    })

    listado.sort((a, b) => b.victorias - a.victorias)
    setRanking(listado)
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Ranking Individual 🏆</h2>

      {ranking.length === 0 ? (
        <p>No hay datos aún.</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Jugados</th>
              <th>Ganados</th>
              <th>Perdidos</th>
              <th>% Victorias</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((j) => (
              <tr key={j.id}>
                <td>{j.nombre}</td>
                <td>{j.jugados}</td>
                <td>{j.victorias}</td>
                <td>{j.derrotas}</td>
                <td>{j.porcentaje}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
