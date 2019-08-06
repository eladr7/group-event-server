var express = require('express');
var router = express.Router();
const Comedy = require('./comedySchema');
const Drama = require('./dramaSchema');
const Fantasy = require('./fantasySchema');

const addMovie = (data, req, res) => {
  const { id, name, image } = req.body;
  if ((!id && id !== 0) || !name || !image) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.name = name;
  data.image = image;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

// this is our create methid
// this method adds new data in our database
router.post('/putMovie/Comedy', (req, res) => {
  let data = new Comedy();
  const { id, name, image } = req.body;
  if ((!id && id !== 0) || !name || !image) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.name = name;
  data.image = image;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putMovie/Drama', (req, res) => {
  let data = new Drama();
  const { id, name, image } = req.body;
  if ((!id && id !== 0) || !name || !image) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.name = name;
  data.image = image;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putMovie/Fantasy', (req, res) => {
  let data = new Fantasy();
  const { id, name, image } = req.body;
  if ((!id && id !== 0) || !name || !image) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.name = name;
  data.image = image;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our get method
// this method fetches all available data in our database
router.get('/getMovies/Comedy', (req, res) => {
  Comedy.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our get method
// this method fetches all available data in our database
router.get('/getMovies/Drama', (req, res) => {
  Drama.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our get method
// this method fetches all available data in our database
router.get('/getMovies/Fantasy', (req, res) => {
  Fantasy.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//export this router to use in our index.js
module.exports = router;


