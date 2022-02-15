const express = require('express')
const Profession = require('../models/Profession')

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const list = await Profession.find()
    // res.status(200).json(list)
    res.status(200).send(list)
  } catch (err) {
    res.status(500).json({
      message: 'Error on server. Try again later'
    })
  }
})

module.exports = router
