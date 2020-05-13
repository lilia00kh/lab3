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

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var space_stationsId = req.params.id;
    console.log(space_stationsId);
    collection.findOne({ id: space_stationsId }).then(function(space_stationsExists) {
        if (space_stationsExists) {
            res.send(`Космічна станція з id ${space_stationsId} існує`);
        } else{
            res.send(`Космічної станції з id ${space_stationsId} не існує`);
        }

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
            res.send(`Космічна станція з id ${req.body.id} вже існує`);
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
                    res.send(`Успішно створена космічна станція з id ${spaceStation.id}`);
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
            res.send(`Успішно відредагована станція з id [${spaceStation.id}]`);
        }
    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('space_stations');
    var space_stationsId = req.params.id;
    console.log(space_stationsId);
    var space_stations = {
        id: req.body.id,
        number: req.body.number,
        necessity: req.body.necessity,
        capacity: req.body.capacity,
    }
    collection.update({ id:space_stationsId  }, { $set: { number: space_stations.number, necessity:space_stations.necessity,capacity:space_stations.capacity } }).then((result) => {
        res.send(`Успішно відредагована космічна станція з id ${space_stations.id}`);
    })
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
            res.send(`Успішно видалена космічна станція з id ${spaceStationId}`);
        }
    });
});

module.exports = router;