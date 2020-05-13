const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/space_stations', function(req, res) {
    res.render('pages/space_stations');
});
router.get('/cargos', function(req, res) {
    res.render('pages/cargos');
});

router.get('/cargoOnStations', function(req, res) {
    res.render('pages/cargoOnStations');
});

router.get('/cargoOnPlanets', function(req, res) {
    res.render('pages/cargoOnPlanets');
});

router.get('/cargoOnPlanetsLessThen30', function(req, res) {
    res.render('pages/cargoOnPlanets');
});


router.get('/planets', function(req, res) {
    res.render('pages/planets');
});

module.exports = router;