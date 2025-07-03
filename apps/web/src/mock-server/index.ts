import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.listen(4000, () => console.log('Mock API running on http://localhost:4000'))
