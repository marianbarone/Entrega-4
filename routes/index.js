
import { Router } from 'express'
const router = Router()

router.get('/mascotas', (req, res) => {
    res.json(mascotas)
})

router.post('/mascotas', (req, res) => {
    const { nombre, raza, edad } = req.body

})

router.get('/personas', (req, res) => {
    res.json(personas)
    
})

router.post('/personas', (req, res) => {

})

export default router;