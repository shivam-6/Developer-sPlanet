const Model = require('../models/solutionModel');
const router = require('express').Router();

router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then(data => {
            console.log('user data added');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getall', (req, res) => {

    Model.find({})
        .then(data => {
            console.log('all data fetched ');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbyquery/:query', (req, res) => {

    Model.find({ query: req.params.query })
        .then(data => {
            console.log('new query fetched');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbydeveloper/:developer', (req, res) => {

    Model.find({ developer: req.params.developer })
        .then(data => {
            console.log('Developer fetched');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id).populate('video')
        .then(data => {
            console.log('user fetched by id');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

module.exports = router;