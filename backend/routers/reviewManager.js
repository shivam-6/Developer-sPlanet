const Model = require('../models/userModel');
const router = require('express').Router();

router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then(data => {
            console.log('user data added');
            res.status(200).json({ message: 'success' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getall', (req, res) => {

    Model.find({})
        .then(data => {
            console.log('all data fetched');
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
            console.log('developer fetched');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbyCommunity/:community', (req, res) => {

    Model.find({ community: req.params.community })
        .then(data => {
            console.log('community added');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id)
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