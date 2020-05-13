var express = require('express');
var router = express.Router();

// GET /cargos
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /cargos/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    var cargoId = req.params.id;
    collection.findOne({id: cargoId}, {}, function (e, docs) {
        res.json(docs);
    });
});

// POST /cargos
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoExists) {
        if (cargoExists) {
            res.send(`cargo with id ${req.body.id} already exists`);
        } else {
            var cargo = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                mass: req.body.mass,
            };
            collection.insert(cargo, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    // res.redirect(`/${cargo.id}`);
                    res.send(`Successfully created cargo [${cargo.id}] ${cargo.code} ${cargo.name} ${cargo.mass})`);
                }
            });
        }
    });
});

// PUT /cargos
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    var cargo = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass
    };
    collection.update({ id: cargo.id }, cargo, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            // res.redirect(`/${cargo.id}`);
            res.send(`Successfully updated cargo with id [${cargo.id}]`);
        }
    });
});

// DELETE /cargos/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    var cargoId = req.params.id;
    collection.remove({ id: cargoId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted cargo with id ${cargoId}`);
        }
    });
});

module.exports = router;