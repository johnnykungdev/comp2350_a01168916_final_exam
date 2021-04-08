const router = require('express').Router()
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');

router.get('/showReviews', (req, res) => {
    console.log(req.query)
    console.log("show reviews:" + req.query.id)
    const restaurant_id = req.query.id
    database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getReview(restaurant_id, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
                    console.log(result)
                    let review = null
                    if (!result[0]) return res.redirect('/')
                    if (result[0].review_id) review = result
                    console.log(Boolean(result[0].review_id))
                    console.log(review)
					res.render('review', {review: review, restaurantId: result[0].restaurant_id, restaurant: result[0].name });

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});
})

router.post('/review', (req, res) => {
    console.log(req.body)
    database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log(req.body); 
			dbModel.addReview(req.body, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error writing to MySQL'});
					console.log("Error writing to mysql");
					console.log(err);
				}
				else { //success
					res.redirect(`/showReviews?id=${req.body.restaurant_id}`);

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			
			dbConnection.release();
		}
	});
})

router.post('/deleteReview', (req, res) => {
    database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log("req body", req.body.reviewId);

			let reviewId = req.body.reviewId;
			if (reviewId) {
				//delete from person_skill where person_id = :person_id;
				dbModel.deleteReview(reviewId, (err, result) => {
					if (err) {
						res.render('error', {message: 'Error writing to MySQL'});
						console.log("Error writing to mysql");
						console.log(err);
					}
					else { //success
						//delete from person where person_id = :person_id;
						dbModel.deleteReview(reviewId, (err, result) => {
							if (err) {
								res.render('error', {message: 'Error writing to MySQL'});
								console.log("Error writing to mysql");
								console.log(err);
							}
							else { //success
								res.redirect(`/showReviews?id=${req.body.restaurant_id}`);

								//Output the results of the query to the Heroku Logs
								console.log(result);
							}
						});
					}
				});
			}
			else {
				res.render('error', {message: 'Error on Delete'});
			}
		
			dbConnection.release();
		}
	});
})

module.exports = router