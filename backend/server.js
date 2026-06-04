require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const resumeRoutes = require('./routes/resume')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Resume Builder API Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)

app.get(
  '/api/profile',
  authMiddleware,
  (req, res) => {
    res.json({
      message: 'Protected Route Accessed',
      user: req.user,
    })
  },
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
  )
})