# ⚽ Ejercicio · El Álbum de Leyendas

⏱ **35–40 minutos** · 🛠 mongosh · Express 5 + Mongoose 9 · Vite + React + **axios** (ya hecho) · Node 22.12+ · MongoDB local o Atlas

## La situación

Tu grupo de amigos lleva el álbum de figuritas en un cuaderno y ya es un caos: nadie sabe cuáles le faltan ni cuáles tiene repetidas para cambiar en el recreo. Alguien armó una app: el front en React ya está hecho, la API en Express casi. Falta **el esquema, el CRUD con Mongoose y… que el front y el back se hablen**, porque cuando abren el álbum, no anda nada.

Ya está hecho: la conexión a la base, las rutas, el `errorHandler` (traduce los errores de Mongoose a 400 / 409), la semilla con las 30 figuritas, un ejemplo de controller (`obtenerResumen`) y **todo el frontend**. Los archivos para completar tienen 🚧.

```
backend/
├── models/figurita.model.js              🚧 PASO 1
├── consultas.mongosh.js                  🚧 PASO 2 (tu machete de mongosh)
├── controllers/figuritas.controller.js   🚧 PASO 3 (obtenerResumen ✅ es el ejemplo)
├── server.js                             🚧 PASO 4
├── config/db.js · routes/ · middlewares/ ✅
└── semilla.js                            ✅ npm run semilla
frontend/                                 ✅ el álbum (salvo el PASO 4)
```

**Cómo leer `cantidad`:** es cuántas tenés de esa figurita. `0` → te falta · `1` → pegada · `2` o más → tenés repetidas.

## Para arrancar

Dos terminales, una para cada proyecto:

```bash
# Terminal 1 · la API
cd backend
npm install
cp .env.example .env    # en Windows: copy .env.example .env
npm run dev             # → http://localhost:3000/api/figuritas

# Terminal 2 · el álbum
cd frontend
npm install
npm run dev             # → http://localhost:5173
```

El álbum va a mostrar un error hasta el PASO 4: es parte del ejercicio. Hasta ahí, probá la API **directo en el navegador**.

## Pasos

### 1 · El esquema (`models/figurita.model.js`) · ~8 min

| Campo | Tipo | Reglas (con estos mensajes) |
|---|---|---|
| `numero` | Number | obligatorio (`El número es obligatorio`) · entre 1 y 40 (`El álbum va de la 1 a la 40`) · único |
| `jugador` | String | obligatorio (`El jugador es obligatorio`) · sin espacios a los costados |
| `seleccion` | String | obligatoria (`La selección es obligatoria`) · de la lista `SELECCIONES` (`"{VALUE}" no está en el álbum`) |
| `posicion` | String | obligatoria (`La posición es obligatoria`) · de la lista `POSICIONES` (`"{VALUE}" no es una posición válida`) |
| `cantidad` | Number | mínimo 0 (`La cantidad no puede ser negativa`) · por defecto, 0 |
| `brillante` | Boolean | por defecto, `false` |

Después, en la terminal 1 (cortá el `dev` con Ctrl + C, o abrí otra):

```bash
npm run semilla     # 🌱 Semilla lista: 30 figuritas en album-leyendas
```

### 2 · Explorá el álbum con mongosh (`consultas.mongosh.js`) · ~7 min

Abrí `mongosh` en otra terminal y resolvé las 8 consignas del archivo: cuántas hay, cuáles te faltan, tus repetidas de Argentina, ¡salió Messi en un sobre!… Escribí cada comando en el archivo. **Los filtros que armes acá son los que vas a usar en el PASO 3.** Al terminar, `npm run semilla` para volver al álbum original.

### 3 · El CRUD (`controllers/figuritas.controller.js`) · ~12 min

| | Ruta | Método de Mongoose | Responde |
|---|---|---|---|
| a | `GET /api/figuritas` · `?estado=faltan\|pegadas\|repetidas` · `?seleccion=Argentina` | `find(filtro)` | 200 |
| b | `POST /api/figuritas` | `new Figurita(…)` + `save()` | 201 |
| c | `PATCH /api/figuritas/:id/sumar` | `findByIdAndUpdate` con `$inc` y `returnDocument: 'after'` | 200 · 404 |
| d | `PATCH /api/figuritas/:id/restar` | `findOneAndUpdate` con `$inc`… pero solo si tenés alguna | 200 · 409 |

Probalo en el navegador (los GET):
- http://localhost:3000/api/figuritas?estado=repetidas&seleccion=Argentina → Dibu Martínez y Kempes
- http://localhost:3000/api/figuritas/resumen → `{ total: 30, pegadas: 21, faltan: 9, repetidas: 7 }`

### 4 · 🔌 "La API anda, pero el álbum no" · ~8 min

La API responde perfecto en el navegador, pero el álbum (http://localhost:5173) no muestra nada. Hay **tres problemas**, uno en cada uno de estos archivos:

1. `frontend/.env.development`
2. `backend/server.js`
3. `frontend/src/servicios/api.js`

Arreglalos **de a uno**: cada arreglo cambia el mensaje de error del álbum. Tus herramientas: el mensaje en pantalla, la **consola** del navegador (F12) y la pestaña **Red / Network** (¿a qué URL fue el pedido? ¿qué respondió?).

<details>
<summary>💡 Pista 1 · "Eso no es la API: el pedido fue a http://localhost:5173/…"</summary>

¿Qué variable lee `api.js` para la `baseURL`? ¿Cuál define `.env.development`? Vite solo le pasa al código del navegador las variables con cierto prefijo. Después de cambiar el `.env`, reiniciá `npm run dev`.
</details>

<details>
<summary>💡 Pista 2 · "No se pudo conectar con la API…"</summary>

Leé el error rojo de la consola. El front (puerto 5173) y la API (3000) son **orígenes distintos**: la API tiene que autorizar al front. Hay un paquete de npm que se llama igual que el error. El origen permitido sale de `process.env.FRONTEND_URL`.
</details>

<details>
<summary>💡 Pista 3 · "La API respondió, pero listarFiguritas no devolvió un array"</summary>

Mirá lo que dice que devolvió. ¿Qué es `respuesta.data` en axios? ¿Y qué manda nuestra API adentro del cuerpo?
</details>

Si arreglaste algo y el mensaje no cambia, recargá la página (Ctrl + Shift + R).

### 5 · Publicalo 🚀

Con todo andando, seguí [`DEPLOY.md`](DEPLOY.md) para tener el álbum online (Atlas + Render + Vercel, gratis). No entra en los 40 minutos: es para después.

## ✅ Listo cuando…

- El álbum muestra las 30 figuritas y arriba dice **21/30 pegadas · 9 me faltan · 7 con repetidas**.
- Los filtros andan y se combinan: 🔁 Repetidas + 🇦🇷 Argentina → Dibu y Kempes.
- 🎁 +1 en Messi dice *¡Pegaste a Lionel Messi!*; otra vez, que ya tenés 1 para cambiar.
- 🔁 −1 en una que te falta (Pelé) dice *No la tenés: no la podés cambiar*, y Pelé **no** queda en −1.
- "Agregar" con el formulario vacío muestra los 4 mensajes de tu esquema; con selección "Narnia", el del `enum`; con el número 6, que ya existe.
- Agregar la 31 (Riquelme, Argentina, Mediocampista) la muestra en el álbum con cantidad 0.

## ➕ Plus

1. Que la lista venga siempre **ordenada por número** (agregá la 31 antes y fijate dónde aparece).
2. `GET /api/figuritas?q=mes` → busca jugadores que contengan "mes", sin importar mayúsculas (`$regex`).
3. En `restar`, `null` puede ser "no la tenés" o "ese id no existe". Distinguilos: 409 o 404.

## 🧠 Para pensar

1. ¿Por qué el `min: 0` del esquema no alcanza para que restar no deje −1? Probalo: `findByIdAndUpdate` con `$inc: -1` y `runValidators: true` sobre Pelé.
2. Dos amigos tocan 🎁 +1 en la misma figurita al mismo tiempo. ¿Por qué `$inc` es mejor que leer la cantidad, sumarle 1 en JavaScript y guardarla?
3. En mongosh, `find({ cantidad: '0' })` no trae nada. ¿Por qué `?estado=faltan` funciona, si `req.query` siempre trae strings? (Pista: ¿quién arma el filtro, y quién lo castea?)
4. ¿Por qué podés poner `VITE_API_URL` en el front, pero **nunca** la contraseña de Atlas en una variable `VITE_`?
5. Desde el navegador directo o Postman, la API anda sin `cors`. ¿Entonces `cors` protege a la API?
