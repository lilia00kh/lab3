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
    var cargosId = req.params.id;
    console.log(cargosId);
    collection.findOne({ id: cargosId }).then(function(cargosExists) {
        if (cargosExists) {
            res.send(`Вантаж з id ${cargosId} існує`);
        } else{
            res.send(`Вантаж з id ${cargosId} не існує`);
        }

    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    var cargosId = req.params.id;
    console.log(cargosId);
    var cargos = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass,
    }
    collection.update({ id:cargosId  }, { $set: { code: cargos.code, name:cargos.name,mass:cargos.mass } }).then((result) => {
        res.send(`Успішно оновленовантаж з id ${cargos.id} `);
    })
});

// POST /cargos
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('cargos');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoExists) {
        if (cargoExists) {
            res.send(`Вантаж з id ${req.body.id} вже існує`);
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
                    res.send(`Успішно створено вантаж з id ${cargo.id}`);
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
            res.send(`Успішно оновлено вантаж з id [${cargo.id}]`);
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
            res.send(`Успішно видалено вантаж з id ${cargoId}`);
        }
    });
});

module.exports = router;