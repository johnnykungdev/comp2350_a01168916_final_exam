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
	let sqlDeletePerson = "DELETE FROM restaurant where restaurant_id = :restaurantId";
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
	let sqlRestaurant = "SELECT restaurant.name, review.details, review.reviewer_name, review.rating WHERE restaurant_id = :restaurantId JOIN review ON restaurant.restaurant_id = review.restaurant_id "
	let params = {
		restaurantId: restaurant_id
	};
	database.query(sqlRestaurant, params, (err, results) => {
		if (err) cb(err, null)
		else {
			console.log(results)
			cb(null, results)
		}
	})
}

module.exports = {getAllRestaurants, addRestaurant, deleteRestaurant, deletePersonSkill}
