const router = require('express').Router()
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');

router.get('/showReviews', (req, res) => {
    console.log(req.query)
    console.log("show reviews:" + req.query.id)

    res.render('review')
})

module.exports = router