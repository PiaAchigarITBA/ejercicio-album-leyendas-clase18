import { Router } from 'express'
import {
  obtenerResumen,
  listarFiguritas,
  crearFigurita,
  sumarFigurita,
  restarFigurita,
} from '../controllers/figuritas.controller.js'

const router = Router()

router.get('/', listarFiguritas)
router.get('/resumen', obtenerResumen)
router.post('/', crearFigurita)
router.patch('/:id/sumar', sumarFigurita)
router.patch('/:id/restar', restarFigurita)

export default router
