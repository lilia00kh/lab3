var express = require('express');
var router = express.Router();

// GET /space_stations
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    collection.find({}, {}, function (e, docs) {
        /*console.log(docs.ops);*/
        res.json(docs);
    });
});

// GET /space_stations/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var spaceStationId = req.params.id;
    collection.findOne({ id: spaceStationId }, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /space_stations
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(spaceStationExists) {
        if (spaceStationExists) {
            res.send(`Space Station with id ${req.body.id} already exists`);
        } else{
            var spaceStation = {
                id: req.body.id,
                number: req.body.number,
                necessity: req.body.necessity,
                capacity: req.body.capacity
            };
            collection.insert(spaceStation, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/space_stations/${space_station.id}`);
                    res.send(`Successfully created Space Station [${spaceStation.id}] ${spaceStation.number} ${spaceStation.necessity} ${spaceStation.capacity}`);
                }
            });
        }
    });
});

// PUT /space_stations
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var spaceStation = {
        id: req.body.id,
        number: req.body.number,
        necessity: req.body.necessity,
        capacity: req.body.capacity
    };
    collection.update({ id: spaceStation.id }, spaceStation, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/space_stations/${space_station.id}`);
            res.send(`Successfully updated Space Station with id [${spaceStation.id}]`);
        }
    });
});

// DELETE /space_stations/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var spaceStationId = req.params.id;
    collection.remove({ id: spaceStationId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted Space Station with id ${spaceStationId}`);
        }
    });
});

module.exports = router;