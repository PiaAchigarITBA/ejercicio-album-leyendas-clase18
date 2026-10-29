import Figurita from '../models/figurita.model.js'
import { crearError } from '../middlewares/errorHandler.js'

// - Todas las funciones son async y ninguna necesita try/catch: en Express 5,
//   un error dentro de una función async llega solo al errorHandler (que ya
//   traduce ValidationError → 400, CastError → 400 y E11000 → 409).
// - Todas responden { data, error: null }.
// - Cuando completes una función, borrá su línea "throw crearError('🚧 …', 501)".

// ✅ GET /api/figuritas/resumen → { total, pegadas, faltan, repetidas }
// Ya viene hecho: es el ejemplo. countDocuments(filtro) recibe el mismo filtro
// que find (¡y que en mongosh!), pero devuelve cuántos documentos son.
export async function obtenerResumen(req, res) {
  const total = await Figurita.countDocuments()
  const faltan = await Figurita.countDocuments({ cantidad: 0 })
  const repetidas = await Figurita.countDocuments({ cantidad: { $gt: 1 } })

  res.json({ data: { total, pegadas: total - faltan, faltan, repetidas }, error: null })
}

// 🚧 PASO 3 · a. GET /api/figuritas
//   ?estado=faltan | pegadas | repetidas   y/o   ?seleccion=Argentina
// - Armá el objeto filtro con lo que venga en req.query (se pueden combinar).
// - Los filtros de estado son los que escribiste en mongosh en el PASO 2.
// - Sin query → todas.
export async function listarFiguritas(req, res) {
  throw crearError('🚧 Falta completar listarFiguritas (PASO 3 · a)', 501)
}

// 🚧 PASO 3 · b. POST /api/figuritas
// - new Figurita(…) + save(). Respondé 201 con la figurita creada.
export async function crearFigurita(req, res) {
  throw crearError('🚧 Falta completar crearFigurita (PASO 3 · b)', 501)
}

// 🚧 PASO 3 · c. PATCH /api/figuritas/:id/sumar   (🎁 me salió en un sobre)
// - Sumale 1 a cantidad SIN leerla antes (¿qué operador de mongosh hacía eso?).
// - Respondé con la figurita YA actualizada. Si no existe → 404 ('No existe esa figurita').
export async function sumarFigurita(req, res) {
  throw crearError('🚧 Falta completar sumarFigurita (PASO 3 · c)', 501)
}

// 🚧 PASO 3 · d. PATCH /api/figuritas/:id/restar   (🔁 la cambié)
// - Restale 1 a cantidad… pero solo si tenés al menos una.
// - Si no la tenés → 409 ('No la tenés: no la podés cambiar').
// - Ojo: probá restar una figurita que te falta. ¿Te frena el min: 0 del esquema?
//   Pista: findOneAndUpdate recibe un filtro con más de una condición.
export async function restarFigurita(req, res) {
  throw crearError('🚧 Falta completar restarFigurita (PASO 3 · d)', 501)
}
