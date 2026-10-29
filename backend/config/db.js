import mongoose from 'mongoose'

// Ya viene hecho (lo escribiste en la clase pasada).
// La connection string sale de process.env.MONGODB_URI: en tu compu, del archivo
// .env; en Render, de las variables de entorno del servicio.
export async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`🟢 MongoDB conectado · base: ${mongoose.connection.name}`)
  } catch (err) {
    console.error('🔴 No se pudo conectar a MongoDB:', err.message)
    process.exit(1)
  }
}
