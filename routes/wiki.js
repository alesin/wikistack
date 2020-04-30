const express = require('express');
const router = express.Router();
const indexViews = require('../view/index');
const models = require('../models');


router.get('/', async (req, res, next) => {
  try {
    res.send(indexViews.main())
  } catch (error) { next (error) }
})

router.post('/', async (req, res, next) => {
  // const page = new index.Page({
  //   title: req.body.title,
  //   content: req.body.page_content,
  // });
  // res.json(req.body.title)

  try {
    const page = new models.Page({
      title: req.body.title,
      content: req.body.page_content,
      status: req.body.page_status,
    });
    console.log(req.body.page_status)
    console.log(page.dataValues)
    await page.save();
    res.redirect(`/wiki/${page.dataValues.slug}`);
  } catch (error) { next (error) }
})


router.get('/add', async (req, res, next) => {
  try {
    // await
    res.send(indexViews.addPage())
  } catch (error) { next (error) }
})

router.get('/:slug', (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});



module.exports = router;
