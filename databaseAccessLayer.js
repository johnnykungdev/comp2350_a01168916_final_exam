const database = include('/databaseConnection');

const passwordPepper = "SeCretPeppa4MySal+";

function getAllRestaurants(callback) {
	let sqlQuery = "SELECT * FROM restaurant";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, results);
		}		
	});
}

function addRestaurant(postData, callback) {
	let sqlInsert = "INSERT INTO restaurant (name, description) VALUES (:name, :description);";
	let params = {	
			name: postData.name,
			description: postData.description
		};
	console.log(sqlInsert);
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function deletePersonSkill(personId, callback) {
	let sqlDeletePersonSkill = "delete from person_skill where person_id = :personID";
	let params = {
		personID: personId
	};
	console.log(sqlDeletePersonSkill);
	database.query(sqlDeletePersonSkill, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});	
}
 
function deleteRestaurant(restaurant_id, callback) {
	let sqlDeletePerson = "DELETE restaurant FROM restaurant JOIN review ON restaurant.restaurant_id = review.restaurant_id WHERE restaurant.restaurant_id = :restaurantId";
	console.log("restaurant_id:", restaurant_id)
	let params = {
		restaurantId: restaurant_id
	};
	console.log(sqlDeletePerson);
	database.query(sqlDeletePerson, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});	
}

function getReview(restaurantId, cb) {
	let sqlRestaurant = "SELECT restaurant.restaurant_id, restaurant.name, review.review_id, review.details, review.reviewer_name, review.rating FROM restaurant LEFT JOIN review ON restaurant.restaurant_id = review.restaurant_id WHERE restaurant.restaurant_id = :restaurantId;"
	let params = {
		restaurantId: restaurantId
	};
	database.query(sqlRestaurant, params, (err, results) => {
		if (err) cb(err, null)
		else {
			console.log(results)
			cb(null, results)
		}
	})
}

function addReview(postData, callback) {
	let sqlInsert = "INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES (:restaurant_id, :reviewer_name, :details, :rating);";
	let params = {	
			restaurant_id: postData.restaurant_id,
			reviewer_name: postData.reviewer_name,
			details: postData.details,
			rating: postData.rating
		};
	console.log(sqlInsert);
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function deleteReview(reviewId, callback) {
	let sqlDeleteReview = "DELETE FROM review where review_id = :reviewId";
	let params = {
		reviewId: reviewId
	};
	console.log(sqlDeleteReview);
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});	
}

module.exports = {getAllRestaurants, addRestaurant, deleteRestaurant, deletePersonSkill, getReview, addReview, deleteReview}
