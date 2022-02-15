const express = require('express')
const Quality = require('../models/Quality')

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const list = await Quality.find()
    // res.status(200).json(list)
    res.status(200).send(list)
  } catch (err) {
    res.status(500).json({
      message: 'Error on server. Try again later'
    })
  }
})

module.exports = router
