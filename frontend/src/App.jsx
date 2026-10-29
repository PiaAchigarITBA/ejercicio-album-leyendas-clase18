import { useEffect, useState } from 'react'
import { listarFiguritas, obtenerResumen, restarFigurita, sumarFigurita } from './servicios/api.js'
import { SELECCIONES } from './datos.js'
import Figurita from './componentes/Figurita.jsx'
import FormularioFigurita from './componentes/FormularioFigurita.jsx'

const ESTADOS = [
  { valor: null, texto: 'Todas' },
  { valor: 'faltan', texto: '🕳️ Me faltan' },
  { valor: 'pegadas', texto: '✅ Pegadas' },
  { valor: 'repetidas', texto: '🔁 Repetidas' },
]

function App() {
  const [figuritas, setFiguritas] = useState([])
  const [resumen, setResumen] = useState(null)
  const [estado, setEstado] = useState(null)
  const [seleccion, setSeleccion] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [aviso, setAviso] = useState(null) // mensaje de la última acción
  const [recargar, setRecargar] = useState(0) // se incrementa para volver a pedir todo

  // Pide el resumen y la lista a NUESTRA API (que le pide a MongoDB con Mongoose).
  // Se repite cuando cambia un filtro o cuando algo cambió en la base.
  useEffect(() => {
    let ignorar = false

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datosResumen = await obtenerResumen()
        const lista = await listarFiguritas({ estado, seleccion: seleccion || null })

        if (!Array.isArray(lista)) {
          throw new Error(
            `La API respondió, pero listarFiguritas no devolvió un array. Devolvió: ${JSON.stringify(lista).slice(0, 90)}…`,
          )
        }

        if (!ignorar) {
          setResumen(datosResumen)
          setFiguritas(lista)
        }
      } catch (err) {
        if (!ignorar) setError(err.message)
      } finally {
        if (!ignorar) setCargando(false)
      }
    }

    cargar()
    return () => {
      ignorar = true
    }
  }, [estado, seleccion, recargar])

  async function sumar(figurita) {
    try {
      const actualizada = await sumarFigurita(figurita._id)
      const texto =
        actualizada.cantidad === 1
          ? `🎉 ¡Pegaste a ${actualizada.jugador}!`
          : `🔁 ${actualizada.jugador} repetida: ya tenés ${actualizada.cantidad - 1} para cambiar`
      setAviso({ tipo: 'ok', texto })
      setRecargar((n) => n + 1)
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message })
    }
  }

  async function restar(figurita) {
    try {
      const actualizada = await restarFigurita(figurita._id)
      setAviso({ tipo: 'ok', texto: `🤝 Cambiaste a ${actualizada.jugador} (te quedan ${actualizada.cantidad})` })
      setRecargar((n) => n + 1)
    } catch (err) {
      setAviso({ tipo: 'error', texto: `${figurita.jugador}: ${err.message}` })
    }
  }

  function alAgregar(nueva) {
    setAviso({ tipo: 'ok', texto: `📒 La ${nueva.numero} (${nueva.jugador}) ya está en el álbum` })
    setRecargar((n) => n + 1)
  }

  const porcentaje = resumen?.total ? Math.round((resumen.pegadas / resumen.total) * 100) : 0

  return (
    <>
      <header className="cabecera">
        <div className="titulo">
          <h1 className="logo">Álbum de Leyendas</h1>
          {resumen && (
            <p className="progreso-texto">
              <b>
                {resumen.pegadas}/{resumen.total}
              </b>{' '}
              pegadas · {resumen.faltan} me faltan · {resumen.repetidas} con repetidas
            </p>
          )}
        </div>
        <div className="progreso" aria-label={`${porcentaje}% completo`}>
          <div className="progreso-relleno" style={{ width: `${porcentaje}%` }} />
          <span>{porcentaje}%</span>
        </div>
      </header>

      <main className="contenido">
        <nav className="filtros">
          {ESTADOS.map((e) => (
            <button key={e.texto} className={e.valor === estado ? 'activo' : ''} onClick={() => setEstado(e.valor)}>
              {e.texto}
            </button>
          ))}
          <select value={seleccion} onChange={(e) => setSeleccion(e.target.value)} aria-label="Selección">
            <option value="">🌍 Todas las selecciones</option>
            {SELECCIONES.map((s) => (
              <option key={s.nombre} value={s.nombre}>
                {s.bandera} {s.nombre}
              </option>
            ))}
          </select>
        </nav>

        {aviso && (
          <p className={`aviso ${aviso.tipo}`} onClick={() => setAviso(null)}>
            {aviso.texto}
          </p>
        )}

        {cargando && <p className="estado">Abriendo el álbum…</p>}
        {error && <p className="estado error">{error}</p>}

        {!cargando && !error && (
          <>
            {figuritas.length === 0 && <p className="estado">No hay figuritas con ese filtro.</p>}
            <section className="grilla">
              {/* key: el _id de MongoDB (no hay campo id) */}
              {figuritas.map((f) => (
                <Figurita key={f._id} figurita={f} onSumar={sumar} onRestar={restar} />
              ))}
            </section>
          </>
        )}

        <FormularioFigurita onAgregada={alAgregar} />
      </main>
    </>
  )
}

export default App
