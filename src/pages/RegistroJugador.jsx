import { useState } from 'react'
import { supabase } from '../supabase'

export default function RegistroJugador() {
  const [nombre, setNombre] = useState('')
  const [ladoJuego, setLadoJuego] = useState('derecha')
  const [manoHabil, setManoHabil] = useState('diestro')
  const [mensaje, setMensaje] = useState('')

  const registrarJugador = async () => {
    if (!nombre) {
      setMensaje('Debes ingresar un nombre.')
      return
    }

    const { error } = await supabase.from('jugadores').insert([{
      nombre,
      imagen_url: '',
      lado_juego: ladoJuego,
      mano_habil: manoHabil
    }])

    if (error) {
      console.error(error)
      setMensaje('Error al registrar jugador.')
    } else {
      setMensaje('Jugador registrado con éxito ✅')
      setNombre('')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Registro de Jugador</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <div style={{ marginBottom: 10 }}>
        <label>Lado de juego: </label>
        <select value={ladoJuego} onChange={(e) => setLadoJuego(e.target.value)}>
          <option value="izquierda">Izquierda</option>
          <option value="derecha">Derecha</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Mano hábil: </label>
        <select value={manoHabil} onChange={(e) => setManoHabil(e.target.value)}>
          <option value="diestro">Diestro</option>
          <option value="zurdo">Zurdo</option>
        </select>
      </div>

      <button onClick={registrarJugador} style={{ padding: '10px 20px' }}>
        Registrar
      </button>

      <p style={{ marginTop: 20 }}>{mensaje}</p>
    </div>
  )
}
