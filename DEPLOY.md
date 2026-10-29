# 🚀 Publicar el Álbum de Leyendas (gratis)

Tres piezas, tres lugares, los tres con plan gratuito:

```
  navegador ──► Vercel (frontend React)
                   │  axios → VITE_API_URL
                   ▼
               Render (API Express) ──► MongoDB Atlas (la base)
                   ▲  cors → FRONTEND_URL      MONGODB_URI
```

| Pieza | Plataforma | Variable que la conecta con la siguiente |
|---|---|---|
| Base de datos | **MongoDB Atlas** (cluster M0, gratis) | — |
| API | **Render** (Web Service, plan Free) | `MONGODB_URI` → Atlas · `FRONTEND_URL` → Vercel |
| Front | **Vercel** (plan Hobby, gratis) | `VITE_API_URL` → Render |

Son exactamente las mismas variables que usaste en tu compu, con otras direcciones. **El código no cambia.**

Antes de empezar: el ejercicio tiene que andar completo en tu compu (PASO 4 incluido) y necesitás una cuenta de GitHub. Para Render y Vercel, entrá con "Continue with GitHub": es lo más simple.

---

## 0 · Subir el proyecto a GitHub (5 min)

Un solo repositorio con las dos carpetas, `backend/` y `frontend/`. Desde la carpeta que las contiene:

```bash
git init
git add .
git status        # ⚠️ revisá que NO aparezca backend/.env (tiene tu contraseña de Atlas)
git commit -m "Álbum de Leyendas"
```

Creá un repositorio vacío en github.com (sin README) y seguí las dos líneas que te muestra (`git remote add origin …` y `git push -u origin main`).

> Si `backend/.env` aparece en `git status`, frená: revisá que `backend/.gitignore` diga `.env`. Si ya lo subiste, cambiá la contraseña del usuario en Atlas.

---

## 1 · MongoDB Atlas: la base en la nube (5 min)

Si ya tenés un cluster de la clase 15, usá ese y saltá al punto 4.

1. Entrá a [cloud.mongodb.com](https://cloud.mongodb.com) → **Create** → plan **Free (M0)** → proveedor y región cualquiera (São Paulo queda cerca).
2. **Database Access** → *Add New Database User* → usuario y contraseña (usá una contraseña sin `@`, `:`, `/` ni `#`: rompen la URL). Rol: *Read and write to any database*.
3. **Network Access** → *Add IP Address* → **Allow access from anywhere** (`0.0.0.0/0`). Render gratis no tiene una IP fija: si no hacés esto, la API no se va a poder conectar.
4. **Connect** → *Drivers* → copiá la connection string y agregale el nombre de la base **antes del `?`**:

   ```
   mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/album-leyendas?retryWrites=true&w=majority
   ```

5. **Cargá las figuritas en Atlas desde tu compu**: poné esa URI en `backend/.env` y corré:

   ```bash
   cd backend
   npm run semilla     # 🌱 Semilla lista: 30 figuritas en album-leyendas
   ```

   Si querés, mirá los datos en Atlas (*Browse Collections*) o en Compass.

---

## 2 · Render: publicar la API (10 min)

1. En [render.com](https://render.com) → **New +** → **Web Service** → conectá GitHub y elegí tu repositorio.
2. Completá:

   | Campo | Valor |
   |---|---|
   | Name | `album-leyendas-api` (va a ser parte de la URL) |
   | Root Directory | `backend` |
   | Runtime / Language | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

3. **Environment Variables** (*Add Environment Variable*):

   | Key | Value |
   |---|---|
   | `MONGODB_URI` | la URI de Atlas del paso 1 (con `/album-leyendas`) |
   | `FRONTEND_URL` | por ahora, `http://localhost:5173` (la cambiamos en el paso 4) |

   `PORT` **no** se configura: Render la pone sola, y `server.js` ya la lee de `process.env.PORT`.

4. **Create Web Service**. Mirá los *Logs*: tiene que aparecer `🟢 MongoDB conectado · base: album-leyendas`.
5. Copiá la URL de arriba (algo como `https://album-leyendas-api.onrender.com`) y probala en el navegador:
   - `https://album-leyendas-api.onrender.com/` → *API del Álbum de Leyendas ⚽*
   - `https://album-leyendas-api.onrender.com/api/figuritas/resumen` → los números del álbum

> **¿Por qué `npm start` funciona sin `.env`?** En Render no existe el archivo `.env` (no lo subiste). Por eso el script `start` usa `--env-file-if-exists=.env`: si el archivo no está, no falla, y las variables llegan desde el panel de Render. (`npm run dev` usa `--env-file`, que sí exige el archivo.)

> **El plan Free se duerme** después de 15 minutos sin pedidos. El primer pedido después de eso tarda hasta un minuto en responder: no está roto, se está despertando.

---

## 3 · Vercel: publicar el front (5 min)

1. En [vercel.com](https://vercel.com) → **Add New…** → **Project** → importá el mismo repositorio.
2. **Root Directory** → *Edit* → `frontend`. Vercel detecta **Vite** solo (Build: `npm run build`, Output: `dist`).
3. **Environment Variables**:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://album-leyendas-api.onrender.com/api` (la de Render **+ `/api`**, con `https`, sin `/` al final) |

4. **Deploy**. Copiá la URL de producción (algo como `https://album-leyendas.vercel.app`).

> **Las `VITE_` se "hornean" en el build.** `vite build` reemplaza `import.meta.env.VITE_API_URL` por el texto de la URL dentro del JavaScript que descarga el navegador. Por eso: (1) si cambiás la variable, tenés que hacer **Redeploy**; (2) nunca pongas algo secreto en una `VITE_`: cualquiera lo puede leer.

Si abrís el álbum ahora, vas a ver *"No se pudo conectar con la API"* y un error de CORS en la consola. Es esperable: falta el último paso.

---

## 4 · Cerrar el círculo: CORS (2 min)

1. En Render → tu servicio → **Environment** → cambiá `FRONTEND_URL` por la URL de Vercel:

   ```
   https://album-leyendas.vercel.app
   ```

   Exacta: con `https://` y **sin `/` al final** (el navegador compara el origen letra por letra).

2. Guardá con **Save, rebuild, and deploy** y esperá a que termine.
3. Abrí el álbum en Vercel. 🎉 Probá sumar una figurita y mirá en Atlas cómo cambia `cantidad`.

Mandale el link a alguien: cuando tu amigo toca 🎁 +1, la figurita se suma en la misma base que ves vos.

---

## 🩺 Si algo no anda

| Lo que ves | Dónde | Qué pasa |
|---|---|---|
| `MongooseServerSelectionError` / *Could not connect to any servers* | Logs de Render | Falta `0.0.0.0/0` en **Network Access** de Atlas. |
| `bad auth : authentication failed` | Logs de Render | Usuario o contraseña de la URI. Si la contraseña tiene símbolos, cambiala por una sin símbolos. |
| `The uri parameter … got "undefined"` | Logs de Render | La variable no se llama exactamente `MONGODB_URI` en Render. |
| `node: bad option: --env-file-if-exists` | Logs de Render | Render usó un Node viejo. El `package.json` pide `"engines": { "node": ">=22.12" }`: revisá que esté, o agregá la variable `NODE_VERSION` = `22`. |
| La API responde, pero en `/api/figuritas` sale `[]` | Navegador | No corriste la semilla contra Atlas, o la URI no tiene `/album-leyendas` (se guardó en la base `test`). |
| *"Eso no es la API: el pedido fue a https://….vercel.app/figuritas/…"* | Álbum en Vercel | Falta `VITE_API_URL` en Vercel, o la agregaste después del deploy → **Redeploy**. |
| *"No se pudo conectar"* + `blocked by CORS policy` | Consola del navegador | `FRONTEND_URL` en Render no coincide con la URL del front: `/` al final, `http` en vez de `https`, o estás en una URL de *preview* de Vercel (usá la de producción). |
| `Mixed Content … was loaded over HTTPS, but requested an insecure resource` | Consola | `VITE_API_URL` empieza con `http://`: tiene que ser `https://`. |
| El primer pedido tarda casi un minuto | — | Render Free estaba dormido. Esperá y recargá. |
| `404` en `https://…onrender.com/figuritas` | Navegador | Falta `/api` al final de `VITE_API_URL`. |

## 🔁 Y después

Cada `git push` a `main` vuelve a publicar solo **las dos** cosas: Render reconstruye la API y Vercel el front. No hay que repetir nada de esto.

> **Alternativa para el front:** [Netlify](https://netlify.com) funciona igual que Vercel (Base directory `frontend`, Build `npm run build`, Publish `dist`, variable `VITE_API_URL`).
