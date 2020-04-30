const express = require('express');
const router = express.Router();
const index = require('../view/index');


router.get('/', async (req, res, next) => {
  try {
    res.send(index.main())
  } catch {

  }
})

router.post('/', async (req, res, next) => {
  // try {
  //   await
  // } catch {

  // }
  res.send('got to POST /wiki/')
})

router.get('/add', async (req, res, next) => {
  // try {
  //   await
  // } catch {

  // }
  res.send(index.addPage())
})





module.exports = router;
