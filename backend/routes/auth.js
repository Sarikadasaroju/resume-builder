const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../database/db')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'All fields are required',
    })
  }

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          error: 'Database error',
        })
      }

      if (user) {
        return res.status(400).json({
          error: 'User already exists',
        })
      }

      try {
        const hashedPassword = await bcrypt.hash(
          password,
          10,
        )

        db.run(
          `
          INSERT INTO users
          (name, email, password)
          VALUES (?, ?, ?)
          `,
          [name, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({
                error: 'Failed to register',
              })
            }

            res.status(201).json({
              message: 'User registered successfully',
              userId: this.lastID,
            })
          },
        )
      } catch (error) {
        res.status(500).json({
          error: 'Server error',
        })
      }
    },
  )
})

// Login
router.post('/login', (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    })
  }

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          error: 'Database error',
        })
      }

      if (!user) {
        return res.status(400).json({
          error: 'Invalid email or password',
        })
      }

      const isPasswordMatched =
        await bcrypt.compare(
          password,
          user.password,
        )

      if (!isPasswordMatched) {
        return res.status(400).json({
          error: 'Invalid email or password',
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      )

      res.status(200).json({
        message: 'Login successful',
        token,
      })
    },
  )
})

module.exports = router