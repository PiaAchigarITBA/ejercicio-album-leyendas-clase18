// Crea un error con un status HTTP, para tirarlo con throw desde los controllers.
export function crearError(message, status = 500) {
  const error = new Error(message)
  error.status = status
  return error
}

// Express reconoce un middleware de errores porque tiene CUATRO parámetros.
export function errorHandler(err, req, res, next) {
  console.error(err)

  // ══════════════════════════════════════════════════════════════════════════
  // PASO 4 · Traducir los errores de Mongoose a respuestas HTTP
  //
  // Sin esto, cualquier error de Mongoose sale como 500 (error del servidor),
  // cuando en realidad el que mandó mal los datos fue el cliente.
  // Se distinguen por err.name (y el de MongoDB, por err.code).
  // ══════════════════════════════════════════════════════════════════════════

  // a. ValidationError: falló alguna regla del esquema (required, min, enum…)
  //    o un valor no se pudo castear al guardar ('doce' en un Number).
  //    err.errors tiene una entrada por campo: { nivel: { message: '…' }, … }
  //    Devolvemos todos los mensajes, campo por campo, para que el front los muestre.
  if (err.name === 'ValidationError') {
    const campos = {}
    for (const [campo, detalle] of Object.entries(err.errors)) {
      campos[campo] = detalle.message
    }
    return res.status(400).json({
      data: null,
      error: { message: 'Hay datos inválidos', campos },
    })
  }

  // b. CastError: un valor que no se puede convertir al tipo del esquema, fuera
  //    de un save. El caso típico: un id que no tiene forma de ObjectId en la URL
  //    (/api/pokemones/abc). err.path es el campo y err.value, lo que llegó.
  if (err.name === 'CastError') {
    return res.status(400).json({
      data: null,
      error: { message: `"${err.value}" no es un valor válido para ${err.path}` },
    })
  }

  // c. E11000: clave duplicada. Lo tira MongoDB (no Mongoose) por el índice que
  //    creó unique: true. err.keyValue dice qué campo y valor se repitió.
  //    409 Conflict: el pedido choca con algo que ya existe.
  if (err.code === 11000) {
    const [campo, valor] = Object.entries(err.keyValue)[0]
    return res.status(409).json({
      data: null,
      error: { message: `Ya existe un registro con ${campo} = ${valor}` },
    })
  }

  // Todo lo demás: nuestros crearError (404, 409) o un error inesperado (500).
  res.status(err.status || 500).json({
    data: null,
    error: { message: err.message || 'Error interno del servidor' },
  })
}
