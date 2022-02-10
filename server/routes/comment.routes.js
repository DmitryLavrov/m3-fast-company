const express = require('express')
const auth = require('../middleware/auth.middleware')
const Comment = require('../models/Comment')

const router = express.Router({mergeParams: true})

router.route('/')
      .get(auth, async (req, res) => {
        try {
          const {orderBy, equalTo} = req.query

          const list = Comment.find({[orderBy]: equalTo})

          res.status(200).send(list)

        } catch (err) {
          res.status(500).json({
            message: 'Error on server. Try again later'
          })
        }
      })

      .post(auth, async (req, res) => {
        try {
          const newComment = await Comment.create({
            ...req.body,
            userId: req.user._id
          })

          res.status(201).send(newComment)

        } catch (err) {
          res.status(500).json({
            message: 'Error on server. Try again later'
          })
        }
      })

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const {commentId} = req.params
    const removedComment = Comment.findById(commentId)

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.deleteOne()
      res.status(204).send(null)
    } else {
      res.status(401).json({message: 'UNAUTHORIZED'})
    }

  } catch (err) {
    res.status(500).json({
      message: 'Error on server. Try again later'
    })
  }
})

module.exports = router
