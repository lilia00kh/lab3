var express = require('express');
var router = express.Router();

// GET /planets
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /passengers/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    var planetId = req.params.id;
    console.log(planetId);
    collection.findOne({ id: planetId }).then(function(planetExists) {
        if (planetExists) {
            res.send(`Планета з id ${planetId} існує`);
        } else{
            res.send(`Планета з id ${planetId} не існує`);
        }

        });
});
// POST /planets
router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    var planetId = req.params.id;
    console.log(planetId);
    var planet = {
        id: req.body.id,
        name: req.body.name,
        mass: req.body.mass,
        capacity: req.body.capacity,
    }
    collection.update({ id:planetId  }, { $set: { name: planet.name, mass:planet.mass,capacity:planet.capacity } }).then((result) => {
        res.send(`Успішно відредаговано планету з id ${planet.id}`);
    })
});

// POST /passengers
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(planetExists) {
        if (planetExists) {
            res.send(`Планета з id ${req.body.id} вже існує`);
        } else{
            var planet = {
                id: req.body.id,
                name: req.body.name,
                mass: req.body.mass,
                capacity: req.body.capacity,
            };
            collection.insert(planet, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/passengers/${passenger.id}`);
                    res.send(`Успішно створена планета з id ${planet.id}`);
                }
            });
        }
    });
});

// PUT /planets
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    var planet = {
        id: req.body.id,
        name: req.body.name,
        mass: req.body.mass,
        capacity: req.body.capacity
    };
    collection.update({ id: planet.id }, planet, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/passengers/${passenger.id}`);
            res.send(`Успішно відредаговано планету з id ${planet.id}`);
        }
    });
});

// DELETE /planets/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('planets');
    var planetId = req.params.id;
    collection.remove({ id: planetId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено планету id ${planetId}`);
        }
    });
});

module.exports = router;