// 🚧 PASO 2 · Explorá el álbum con mongosh
//
// Abrí otra terminal y entrá a mongosh:
//   local:  mongosh
//   Atlas:  mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/" --apiVersion 1 --username TU_USUARIO
//
// Escribí cada comando debajo de su 👉, probalo en mongosh y anotá lo que te dio.
// (Este archivo no se ejecuta: es tu machete. Los filtros de 3 y 4 los vas a
// reusar en el PASO 3.)

// 1 · Pararte en la base del álbum y ver qué colecciones tiene.
//     ¿Cómo se llama la colección? ¿Quién eligió ese nombre?
// 👉


// 2 · ¿Cuántas figuritas tiene el álbum?
//     Pista: countDocuments(filtro) es como find, pero devuelve un número.
// 👉


// 3 · ¿Cuáles te faltan? Mostrá solo el número y el jugador (sin _id).
// 👉


// 4 · El lunes llevás las repetidas de Argentina al recreo para cambiar.
//     ¿Cuáles son? (repetida = tenés más de 1)
// 👉


// 5 · ¿Qué brillantes ✨ te faltan?
// 👉


// 6 · Abriste un sobre y… ¡salió Messi (la 6)! Sumale 1 SIN escribir cuántas tenías.
// 👉


// 7 · Tu primo te regaló todas sus figuritas de Uruguay: sumale 1 a cada una.
//     ¿Qué te dicen matchedCount y modifiedCount?
// 👉


// 8 · 🪤 La trampa: probá esto y explicá por qué no trae nada.
//     db.figuritas.find({ cantidad: '0' })
// 👉 (tu explicación)


// Cuando termines, volvé a cargar el álbum original (en la terminal de la API):
//   npm run semilla
