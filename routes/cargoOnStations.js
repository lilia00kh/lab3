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
    var spaceStations = db.get('space_stations');
    var cargos= db.get('cargos');
    let result={};
    let b = true



    spaceStations.findOne({ id: req.body.spaceStation }, {}, function (e, docs) {
        return !!docs;
    }).then(function(cargoOnStationExists) {
            if (cargoOnStationExists) {
                cargos.findOne({ id: req.body.cargo }, {}, function (e, docs) {
                    return !!docs;
                }).then(function(cargoOnStationExists) {
                    if (cargoOnStationExists) {
                        collection.findOne({ id: req.body.id }, {}, function (e, docs) {
                            return !!docs;
                        }).then(function(cargoOnStationExists) {
                            if (cargoOnStationExists) {
                                res.send(`Вантаж на станції з id ${req.body.id} вже існує`);
                            } else {
                                collection.find({}).then((docs) => {
                                    docs.forEach((value) => {
                                        result[value.spaceStation] = result[value.spaceStation] + 1 || 1;

                                    });

                                });

                                spaceStations.find({}).then((docs) => {
                                    docs.forEach((value)=> {

                                        for (let key in result) {

                                            if (value.id==req.body.spaceStation && value.id== key && +value.capacity <= result[key] && +value.necessity*1.2 <= result[key] ) {
                                                b=false;
                                                break;
                                            }

                                        }
                                    })
                                    if(b) {
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
                                                res.send(`Успішно створений вантаж на станції з id ${cargoOnStation.id}`);
                                            }
                                        });
                                    }
                                    else{
                                        res.send(`На станції з id ${req.body.spaceStation} немає місця для вантажу!`);
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        res.send(`Вантажу з id ${req.body.cargo} не існує`);
                    }})
            }
            else
            {
                res.send(`Станції з id ${req.body.spaceStation} не існує`);
            }
        }
    );

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