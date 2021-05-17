const Model = require('../models/queryModel');
const router = require('express').Router();

router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id).populate('comments')
        .then(data => {
            console.log('comments fetched by id');
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

module.exports = router;