import express from 'express'
import { conectarDB } from './config/db.js'
import figuritasRouter from './routes/figuritas.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

// 🚧 PASO 4 · Desde el navegador (http://localhost:3000/api/figuritas) la API
// anda. Desde el álbum (http://localhost:5173), no. ¿Qué le falta a la API para
// aceptar pedidos que vienen de otra página? Mirá la consola del navegador.
//
// Pensá en el deploy: la dirección del front no va escrita acá, sale de
// process.env.FRONTEND_URL (está en .env.example).

app.use(express.json())

// Para probar rápido que la API está viva (en Render, es lo primero que mirás).
app.get('/', (req, res) => {
  res.json({ data: 'API del Álbum de Leyendas ⚽ · probá /api/figuritas', error: null })
})

app.use('/api/figuritas', figuritasRouter)

// Siempre al final: atrapa los throw de los controllers (en Express 5, también
// los de las funciones async, sin try/catch).
app.use(errorHandler)

// En Render, PORT lo pone la plataforma: no hay que configurarlo.
const PORT = process.env.PORT ?? 3000

await conectarDB()

app.listen(PORT, () => {
  console.log(`🚀 API en http://localhost:${PORT}/api/figuritas`)
})
