const express = require('express')

const db = require('../database/db')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Save Resume
router.post('/', authMiddleware, (req, res) => {
  const resumeData = JSON.stringify(req.body)

  db.run(
    `
    INSERT INTO resumes
    (user_id, resume_data)
    VALUES (?, ?)
    `,
    [req.user.id, resumeData],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: 'Failed to save resume',
        })
      }

      res.status(201).json({
        message: 'Resume saved successfully',
        resumeId: this.lastID,
      })
    },
  )
})

// Get All User Resumes
router.get('/', authMiddleware, (req, res) => {
  db.all(
    `
    SELECT *
    FROM resumes
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: 'Failed to fetch resumes',
        })
      }

      res.status(200).json(rows)
    },
  )
})

// Update Resume
router.put('/:id', authMiddleware, (req, res) => {
  const resumeData = JSON.stringify(req.body)

  db.run(
    `
    UPDATE resumes
    SET resume_data = ?
    WHERE id = ?
    AND user_id = ?
    `,
    [
      resumeData,
      req.params.id,
      req.user.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: 'Failed to update resume',
        })
      }

      res.status(200).json({
        message: 'Resume updated successfully',
      })
    },
  )
})

// Delete Resume
router.delete('/:id', authMiddleware, (req, res) => {
  db.run(
    `
    DELETE FROM resumes
    WHERE id = ?
    AND user_id = ?
    `,
    [req.params.id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: 'Failed to delete resume',
        })
      }

      res.status(200).json({
        message: 'Resume deleted successfully',
      })
    },
  )
})

module.exports = router