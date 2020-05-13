var express = require('express');
var router = express.Router();

// GET /cargo_on_planets
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnPlanets');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /cargo_on_Planets/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnPlanets');
    var cargoOnPlanetId = req.params.id;
    collection.findOne({id: cargoOnPlanetId}, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /cargo_on_Planets
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnPlanets');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoOnPlanetExists) {
        if (cargoOnPlanetExists) {
            res.send(`Cargo on Planet with id ${req.body.id} already exists`);
        } else {
            var cargoOnPlanet = {
                id: req.body.id,
                planet: req.body.planet,
                cargo: req.body.cargo
            };
            collection.insert(cargoOnPlanet, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/${cargo_on_Planets.id}`);
                    res.send(`Successfully created cargo on Planet [${cargoOnPlanet.id}] ${cargoOnPlanet.planet} ${cargoOnPlanet.cargo})`);
                }
            });
        }
    });
});

// PUT /cargo_on_Planets
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnPlanets');
    var cargoOnPlanet = {
        id: req.body.id,
        planet: req.body.planet,
        cargo: req.body.cargo
    };
    collection.update({ id: cargoOnPlanet.id }, cargoOnPlanet, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${cargo_on_Planets.id}`);
            res.send(`Successfully updated cargo on Planet with id [${cargoOnPlanet.id}]`);
        }
    });
});

// DELETE /cargo_on_Planets/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnPlanets');
    var cargoOnPlanetId = req.params.id;
    collection.remove({ id: cargoOnPlanetId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted cargo on Planet with id ${cargoOnPlanetId}`);
        }
    });
});

module.exports = router;