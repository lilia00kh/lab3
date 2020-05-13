var express = require('express');
var router = express.Router();

// GET /cargo_on_planets
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnStations');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /cargo_on_Stations/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnStations');
    var cargoOnStationId = req.params.id;
    collection.findOne({id: cargoOnStationId}, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /cargo_on_Stations
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnStations');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoOnStationExists) {
        if (cargoOnStationExists) {
            res.send(`Cargo on Station with id ${req.body.id} already exists`);
        } else {
            var cargoOnStation = {
                id: req.body.id,
                spaceStation: req.body.spaceStation,
                cargo: req.body.cargo
            };
            collection.insert(cargoOnStation, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/${cargo_on_Stations.id}`);
                    res.send(`Successfully created cargo on Station [${cargoOnStation.id}] ${cargoOnStation.spaceStation} ${cargoOnStation.cargo})`);
                }
            });
        }
    });
});

// PUT /cargo_on_Stations
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnStations');
    var cargoOnStation = {
        id: req.body.id,
        spaceStation: req.body.spaceStation,
        cargo: req.body.cargo
    };
    collection.update({ id: cargoOnStation.id }, cargoOnStation, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${cargo_on_Stations.id}`);
            res.send(`Successfully updated cargo on Station with id [${cargoOnStation.id}]`);
        }
    });
});

// DELETE /cargo_on_Stations/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargoOnStations');
    var cargoOnStationId = req.params.id;
    collection.remove({ id: cargoOnStationId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted cargo on Station with id ${cargoOnStationId}`);
        }
    });
});

module.exports = router;