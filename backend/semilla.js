// Carga el álbum: borra la colección figuritas y la vuelve a llenar.
// Se corre con: npm run semilla   (ya viene hecho: no hace falta tocarlo)
//
// Usa el modelo, así que los datos pasan por tu esquema: si tiene un error, lo
// vas a ver acá.
import mongoose from 'mongoose'
import Figurita from './models/figurita.model.js'

try {
  await mongoose.connect(process.env.MONGODB_URI)

  await Figurita.deleteMany({})

  // cantidad: 0 = falta · 1 = pegada · 2 o más = repetida
  const figuritas = await Figurita.insertMany([
    { numero: 1, jugador: 'Emiliano Martínez', seleccion: 'Argentina', posicion: 'Arquero', cantidad: 3 },
    { numero: 2, jugador: 'Javier Zanetti', seleccion: 'Argentina', posicion: 'Defensor', cantidad: 1 },
    { numero: 3, jugador: 'Diego Maradona', seleccion: 'Argentina', posicion: 'Mediocampista', cantidad: 1, brillante: true },
    { numero: 4, jugador: 'Mario Kempes', seleccion: 'Argentina', posicion: 'Delantero', cantidad: 2 },
    { numero: 5, jugador: 'Gabriel Batistuta', seleccion: 'Argentina', posicion: 'Delantero', cantidad: 0 },
    { numero: 6, jugador: 'Lionel Messi', seleccion: 'Argentina', posicion: 'Delantero', cantidad: 0, brillante: true },
    { numero: 7, jugador: 'Cafú', seleccion: 'Brasil', posicion: 'Defensor', cantidad: 1 },
    { numero: 8, jugador: 'Ronaldinho', seleccion: 'Brasil', posicion: 'Mediocampista', cantidad: 2 },
    { numero: 9, jugador: 'Pelé', seleccion: 'Brasil', posicion: 'Delantero', cantidad: 0, brillante: true },
    { numero: 10, jugador: 'Ronaldo Nazário', seleccion: 'Brasil', posicion: 'Delantero', cantidad: 1 },
    { numero: 11, jugador: 'Obdulio Varela', seleccion: 'Uruguay', posicion: 'Mediocampista', cantidad: 0 },
    { numero: 12, jugador: 'Enzo Francescoli', seleccion: 'Uruguay', posicion: 'Delantero', cantidad: 1 },
    { numero: 13, jugador: 'Luis Suárez', seleccion: 'Uruguay', posicion: 'Delantero', cantidad: 4 },
    { numero: 14, jugador: 'Zinedine Zidane', seleccion: 'Francia', posicion: 'Mediocampista', cantidad: 1, brillante: true },
    { numero: 15, jugador: 'Thierry Henry', seleccion: 'Francia', posicion: 'Delantero', cantidad: 0 },
    { numero: 16, jugador: 'Kylian Mbappé', seleccion: 'Francia', posicion: 'Delantero', cantidad: 2 },
    { numero: 17, jugador: 'Manuel Neuer', seleccion: 'Alemania', posicion: 'Arquero', cantidad: 1 },
    { numero: 18, jugador: 'Franz Beckenbauer', seleccion: 'Alemania', posicion: 'Defensor', cantidad: 0 },
    { numero: 19, jugador: 'Miroslav Klose', seleccion: 'Alemania', posicion: 'Delantero', cantidad: 1 },
    { numero: 20, jugador: 'Gianluigi Buffon', seleccion: 'Italia', posicion: 'Arquero', cantidad: 2 },
    { numero: 21, jugador: 'Paolo Maldini', seleccion: 'Italia', posicion: 'Defensor', cantidad: 1 },
    { numero: 22, jugador: 'Roberto Baggio', seleccion: 'Italia', posicion: 'Delantero', cantidad: 0 },
    { numero: 23, jugador: 'Iker Casillas', seleccion: 'España', posicion: 'Arquero', cantidad: 1 },
    { numero: 24, jugador: 'Xavi Hernández', seleccion: 'España', posicion: 'Mediocampista', cantidad: 1 },
    { numero: 25, jugador: 'Andrés Iniesta', seleccion: 'España', posicion: 'Mediocampista', cantidad: 2 },
    { numero: 26, jugador: 'Johan Cruyff', seleccion: 'Países Bajos', posicion: 'Delantero', cantidad: 0, brillante: true },
    { numero: 27, jugador: 'Marco van Basten', seleccion: 'Países Bajos', posicion: 'Delantero', cantidad: 1 },
    { numero: 28, jugador: 'Virgil van Dijk', seleccion: 'Países Bajos', posicion: 'Defensor', cantidad: 1 },
    { numero: 29, jugador: 'Bobby Charlton', seleccion: 'Inglaterra', posicion: 'Mediocampista', cantidad: 0 },
    { numero: 30, jugador: 'David Beckham', seleccion: 'Inglaterra', posicion: 'Mediocampista', cantidad: 1 },
  ])

  // Si el esquema todavía está vacío, el modo strict descarta todos los campos
  // y se guardan documentos vacíos (sin error).
  if (!figuritas[0].jugador) {
    console.warn('⚠️  Las figuritas se guardaron vacías: completá el esquema (PASO 1) y volvé a correr la semilla.')
  }

  console.log(`🌱 Semilla lista: ${figuritas.length} figuritas en ${mongoose.connection.name}`)
} catch (err) {
  console.error('🔴 La semilla falló:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
