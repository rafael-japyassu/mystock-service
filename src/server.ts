import 'reflect-metadata'
import './config/env'
import './database'
import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(3333)