import { datosSeleccion } from '../datos.js'

function iniciales(jugador) {
  return jugador
    .split(' ')
    .map((palabra) => palabra[0])
    .slice(0, 2)
    .join('')
}

function Figurita({ figurita, onSumar, onRestar }) {
  const { numero, jugador, seleccion, posicion, cantidad, brillante } = figurita
  const pais = datosSeleccion(seleccion)
  const falta = cantidad === 0
  const repetidas = cantidad - 1

  const clases = ['figurita', falta && 'falta', brillante && 'brillante'].filter(Boolean).join(' ')

  return (
    <article className={clases} style={{ '--color-pais': pais.color }}>
      <p className="figurita-numero">{numero}</p>
      {repetidas > 0 && <p className="repes">×{repetidas} repe</p>}

      <div className="figurita-foto" aria-hidden="true">
        {falta ? '?' : iniciales(jugador)}
      </div>

      <h2>{jugador}</h2>
      <p className="figurita-datos">
        {pais.bandera} {seleccion} · {posicion}
      </p>
      {brillante && <p className="figurita-brillo">✨ Brillante</p>}

      <div className="acciones">
        <button onClick={() => onSumar(figurita)} title="Me salió en un sobre">
          🎁 +1
        </button>
        <button className="secundario" onClick={() => onRestar(figurita)} title="La cambié">
          🔁 −1
        </button>
      </div>
    </article>
  )
}

export default Figurita
