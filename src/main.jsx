import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import RegistroJugador from './pages/RegistroJugador'
import ListaJugadores from './pages/ListaJugadores'
import CrearPartido from './pages/CrearPartido'
import Resultados from './pages/Resultados'
import Ranking from './pages/Ranking'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 10, padding: 10 }}>
        <Link to="/">Inicio</Link>
        <Link to="/registro">Agregar Jugador</Link>
        <Link to="/jugadores">Jugadores</Link>
        <Link to="/partidos">Crear Partido</Link>
        <Link to="/resultados">Resultados</Link>
        <Link to="/ranking">Ranking</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<RegistroJugador />} />
        <Route path="/jugadores" element={<ListaJugadores />} />
        <Route path="/partidos" element={<CrearPartido />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
