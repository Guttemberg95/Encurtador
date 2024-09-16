const express = require('express');
const Link = require('../models/link');
const router = express.Router();
module.exports = router;

/* HOME */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Encurtador' });
});

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/* CREATE LINK*/
router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();
 
  const resultado = await Link.create({
    url,
    code
  })
  res.render('stats', resultado.dataValues);
})

/* LIST ALL LINKS*/
router.get('/links', async (req, res) => {
  const links2 = await Link.findAll({
    where: {
      deletedAt: null,
    },
  });
  res.json(links2);
});

/* REDIRECT LINK*/
router.get('/:code', async (req, res, next) => {
  const code = req.params.code;
 
  const resultado = await Link.findOne({ where: { code, deletedAt: null } });
  if (!resultado) return res.sendStatus(404);
 
  resultado.hits++;
  await resultado.save();
 
  res.redirect(resultado.url);
})

/* STATUS LINK*/
router.get('/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code, deletedAt: null } });
  if (!resultado) return res.sendStatus(404);
  res.render('stats', resultado.dataValues);
})

/* DELETE LINK*/
router.put('/links/:code', async (req, res) => {
  const code = req.params.code;
  const link = await Link.findOne({ where: { code } });
  if (link) {
    await link.update(
      { deletedAt: Date() },
    );
    res.json(link);
  } else {
    res.status(404).json({ message: 'Link not found' });
  }
});