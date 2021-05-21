const Model = require('../models/videoModel');
const router = require('express').Router();

router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then(data => {
            console.log('video data added');
            res.status(200).json({ message: 'success' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbycategory/:category', (req, res) => {

    Model.find({ category: req.params.category })
        .then(data => {
            console.log('video fetched by category');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id).populate('developer').populate('comments')
        .then(data => {
            console.log('video fetched by id');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.delete('/delete/:id', (req, res) => {

    Model.findByIdAndDelete(req.params.id)
        .then(data => {
            console.log('video deleted by id');
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
            console.log('developer fetched ');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.put('/update/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            console.log('video updated ');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.put('/updatecomment/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, { $push: req.body })
        .then(data => {
            console.log('video updated ');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getall', (req, res) => {

    Model.find({}).populate('developer')
        .then(data => {
            console.log('user data fetched ');
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})


module.exports = router;