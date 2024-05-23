import { Router } from "express";
import productsModel from '../dao/models/products.model.js'
import { config } from "../config.js";
const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await productsModel.find().lean()
    
    res.status(200).send({ origin: config.SERVER, payload: products })
  } catch (err) {
    res.status(500).send({origin: config.SERVER, payload: null, error: err.message})
  }
})

router.post('/', async (req, res) => {
  try {
    const socketServer = req.app.get('socketServer')
    const process = await productsModel.create(req.body)

    res.status(200).send({ origin: config.SERVER, payload: process })

    socketServer.emit('newProduct', req.body)

  } catch (err) {
    res.status(500).send({origin: config.SERVER, payload: null, error: err.message})  }
})

router.put('/:id', async (req, res) => {
  try {
    const product = await productsModel.findOneAndUpdate(req.params.id)
    res.status(200).send({ origin: 'server', payload: product })
  } catch (err) {
    res.status(500).send({origin: config.SERVER, payload: null, error: err.message})  }
})

router.delete('/', (req, res) => {
  try {
    res.status(200).send({ origin: 'server', payload: 'delete' })
  } catch (err) {
    res.status(500).send({origin: config.SERVER, payload: null, error: err.message})
  }
})

export default router