const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = express.Router({mergeParams: true})

router.patch('/:userId', auth, async (req, res) => {
  try {
    const {userId} = req.params

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      res.status(200).send(updatedUser)
    } else {
      res.status(401).json({message: 'UNAUTHORIZED'})
    }

  } catch (err) {
    res.status(500).json({
      message: 'Error on server. Try again later'
    })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()

    res.status(200).send(list)
  } catch (err) {
    res.status(500).json({
      message: 'Error on server. Try again later'
    })
  }
})

module.exports = router
