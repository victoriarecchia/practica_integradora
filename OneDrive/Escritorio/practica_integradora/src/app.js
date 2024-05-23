import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

import { Socket } from 'socket.io'
import { config } from './config.js'
import initSocket from './socket.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express()

const expressInstance = app.listen(config.PORT, async() => {
  await mongoose.connect(config.MONGODB_URI)
  console.log(`App activa en el puerto ${config.PORT} conectada a bbdd`);
}) 

const socketServer = initSocket(expressInstance)
app.set('socketServer', socketServer)

app.use(express.json())
app.use(express.urlencoded({extended: 'true'}))


// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', `${config.DIRNAME}/views`)
app.set('view engine', 'handlebars')

// ROUTER
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/static', express.static(`${config.DIRNAME}/public`))