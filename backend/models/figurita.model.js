import { Schema, model } from 'mongoose'

export const SELECCIONES = [
  'Argentina', 'Brasil', 'Uruguay', 'Francia', 'Alemania', 'Italia', 'España', 'Países Bajos', 'Inglaterra',
]

export const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero']

// 🚧 PASO 1 · El esquema de una figurita. La tabla con los campos, las reglas y
// los mensajes está en el README.
//
// cantidad es cuántas TENÉS de esa figurita:
//   0 → te falta · 1 → la tenés pegada · 2 o más → tenés repetidas para cambiar
//
// Pistas (como en el Centro Pokémon):
// - Un mensaje propio se escribe como [valor, 'mensaje']: min: [0, '…']
// - En enum, el mensaje va en un objeto: enum: { values: SELECCIONES, message: '"{VALUE}" …' }
const figuritaSchema = new Schema({
  // 🚧
})

// ¿Hace falta el tercer argumento esta vez? Mongoose pluraliza 'Figurita' → ?
export default model('Figurita', figuritaSchema)
