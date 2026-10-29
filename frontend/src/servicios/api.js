import axios from 'axios'

// ════════════════════════════════════════════════════════════════════════════
// SERVICIO DE LA API DEL ÁLBUM (con axios)
//
// axios.create arma una "instancia" con la configuración común: todos los
// pedidos de abajo usan esa baseURL, así que alcanza con escribir '/figuritas'.
//
// La dirección de la API NO está escrita acá: sale de la variable de entorno
// VITE_API_URL. En tu compu vale http://localhost:3000/api (.env.development) y
// en Vercel, la URL de Render. El código es el mismo en los dos lados.
// ════════════════════════════════════════════════════════════════════════════
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Espera el pedido y devuelve los datos que mandó la API, o tira un Error con
// un mensaje para mostrar (y, si fue un error de validación, con los mensajes
// por campo en error.campos).
async function pedir(pedido) {
  let respuesta

  try {
    respuesta = await pedido
  } catch (err) {
    // A diferencia de fetch, axios tira un error con cualquier status que no
    // sea 2xx (400, 404, 409, 500…). La respuesta de la API está en err.response.
    if (err.response) {
      const error = new Error(err.response.data?.error?.message ?? `La API respondió ${err.response.status}`)
      error.campos = err.response.data?.error?.campos ?? {}
      throw error
    }

    // Sin err.response: el pedido nunca tuvo una respuesta que el navegador nos
    // deje leer. La API está apagada, la URL está mal… o la bloqueó CORS.
    const error = new Error(
      `No se pudo conectar con la API (${err.config?.baseURL}). Abrí la consola del navegador (F12) para ver por qué.`,
    )
    error.campos = {}
    throw error
  }

  // axios ya convirtió el JSON en objeto. Si llegó texto (por ejemplo, un HTML),
  // le pegamos a otra cosa que no es nuestra API.
  if (typeof respuesta.data !== 'object') {
    throw new Error(
      `Eso no es la API: el pedido fue a ${respuesta.request.responseURL}. ¿Esa es la dirección de tu API?`,
    )
  }

  return respuesta.data
}

// GET /api/figuritas/resumen
export function obtenerResumen() {
  return pedir(api.get('/figuritas/resumen'))
}

// GET /api/figuritas?estado=repetidas&seleccion=Argentina
// params arma la query string. Los que valen null o undefined no se mandan.
export function listarFiguritas({ estado, seleccion }) {
  return pedir(api.get('/figuritas', { params: { estado, seleccion } }))
}

// POST /api/figuritas  (axios convierte el objeto a JSON y pone el Content-Type solo)
export function agregarFigurita(datos) {
  return pedir(api.post('/figuritas', datos))
}

// PATCH /api/figuritas/:id/sumar  (el id es el _id que generó MongoDB)
export function sumarFigurita(id) {
  return pedir(api.patch(`/figuritas/${id}/sumar`))
}

// PATCH /api/figuritas/:id/restar
export function restarFigurita(id) {
  return pedir(api.patch(`/figuritas/${id}/restar`))
}
