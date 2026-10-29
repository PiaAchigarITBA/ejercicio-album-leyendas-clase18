// Las mismas listas que el esquema de Mongoose, más lo que necesita la pantalla.
// (Si una selección no está en el esquema, la API la rechaza igual.)
export const SELECCIONES = [
  { nombre: 'Argentina', bandera: '🇦🇷', color: '#75aadb' },
  { nombre: 'Brasil', bandera: '🇧🇷', color: '#f7d117' },
  { nombre: 'Uruguay', bandera: '🇺🇾', color: '#5aa9e6' },
  { nombre: 'Francia', bandera: '🇫🇷', color: '#2f4ea1' },
  { nombre: 'Alemania', bandera: '🇩🇪', color: '#3a3a3a' },
  { nombre: 'Italia', bandera: '🇮🇹', color: '#1f6fc5' },
  { nombre: 'España', bandera: '🇪🇸', color: '#c8102e' },
  { nombre: 'Países Bajos', bandera: '🇳🇱', color: '#f36c21' },
  { nombre: 'Inglaterra', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#e8e8e8' },
]

export const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero']

export function datosSeleccion(nombre) {
  return SELECCIONES.find((s) => s.nombre === nombre) ?? { nombre, bandera: '🏳️', color: '#bbb' }
}
