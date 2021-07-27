import http from 'http'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { Socket } from 'socket.io'

import routes from './routes/routes'

const port = process.env.PORT_APP || 21023

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use('/', routes)

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port ${port}`)
})

const io = require('./socket').init(server)
io.on('connection', (socket: Socket) => {
  console.log('Client connected')
})
