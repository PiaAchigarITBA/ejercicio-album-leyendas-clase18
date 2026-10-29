import { useState } from 'react'
import { agregarFigurita } from '../servicios/api.js'
import { POSICIONES, SELECCIONES } from '../datos.js'

const VACIO = { numero: '', jugador: '', seleccion: '', posicion: '', brillante: false }

// A propósito, este formulario NO valida nada: manda lo que se escriba y deja
// que valide el esquema de Mongoose. Los mensajes que se ven debajo de cada
// campo son los que escribiste en el esquema (llegan en error.campos).
function FormularioFigurita({ onAgregada }) {
  const [form, setForm] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)
  const [enviando, setEnviando] = useState(false)

  function cambiar(e) {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function enviar(e) {
    e.preventDefault()
    setEnviando(true)
    setErrores({})
    setMensaje(null)

    // Solo mandamos los campos que tienen algo. El número viaja como texto
    // ('31'): Mongoose lo castea a Number.
    const datos = {}
    for (const [campo, valor] of Object.entries(form)) {
      if (typeof valor === 'boolean' || valor.trim() !== '') datos[campo] = valor
    }

    try {
      const nueva = await agregarFigurita(datos)
      setForm(VACIO)
      onAgregada(nueva)
    } catch (err) {
      setErrores(err.campos ?? {})
      setMensaje(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>Agregar una figurita al álbum</h2>

      <label>
        Número
        <input name="numero" type="number" value={form.numero} onChange={cambiar} placeholder="31" />
        {errores.numero && <span className="error-campo">{errores.numero}</span>}
      </label>

      <label>
        Jugador
        <input name="jugador" value={form.jugador} onChange={cambiar} placeholder="Juan Román Riquelme" />
        {errores.jugador && <span className="error-campo">{errores.jugador}</span>}
      </label>

      <label>
        Selección
        <select name="seleccion" value={form.seleccion} onChange={cambiar}>
          <option value="">— Elegí una —</option>
          {SELECCIONES.map((s) => (
            <option key={s.nombre}>{s.nombre}</option>
          ))}
          {/* No está en el esquema: para probar el enum */}
          <option>Narnia</option>
        </select>
        {errores.seleccion && <span className="error-campo">{errores.seleccion}</span>}
      </label>

      <label>
        Posición
        <select name="posicion" value={form.posicion} onChange={cambiar}>
          <option value="">— Elegí una —</option>
          {POSICIONES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {errores.posicion && <span className="error-campo">{errores.posicion}</span>}
      </label>

      <label className="check">
        <input name="brillante" type="checkbox" checked={form.brillante} onChange={cambiar} />
        ✨ Es brillante
      </label>

      {mensaje && <p className="error-general">{mensaje}</p>}

      <button disabled={enviando}>{enviando ? 'Pegando…' : 'Agregar'}</button>
    </form>
  )
}

export default FormularioFigurita
