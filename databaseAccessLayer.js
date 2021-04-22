const database = include('/databaseConnection');

const passwordPepper = "SeCretPeppa4MySal+";

function getRecipes(callback) {
	let sqlQuery = "SELECT recipe.name, recipe.description, recipe.cook_time, COUNT(ingredient.recipe_id) AS 'ingredient_num' FROM ingredient RIGHT JOIN recipe ON ingredient.recipe_id = recipe.recipe_id GROUP BY recipe.recipe_id;";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, results);
		}		
	});
}

function addRecipe(postData, callback) {
	let sqlInsert = "INSERT INTO recipe (name, description, cook_time) VALUES (:name, :description, :cookTime);";
	let params = {	
			name: postData.name,
			description: postData.description,
			cookTime: postData.cook_time
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

function getRecipeById(recipe_id, callback) {
	let sqlQuery = "SELECT name FROM recipe WHERE recipe_id = :recipeId;";
	let params = {
		recipeId: recipe_id
	};

	database.query(sqlQuery, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
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
 
function deleteRecipe(recipe_id, callback) {
	let sqlDeletePerson = "DELETE recipe FROM recipe JOIN ingredient ON recipe.recipe_id = ingredient.recipe_id WHERE recipe.recipe_id = :recipeId";
	console.log("recipe_id:", recipe_id)
	let params = {
		recipeId: recipe_id
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

function getIngredients(recipe_id, cb) {
	console.log(recipe_id)
	let sqlRestaurant = "SELECT recipe.name AS 'recipe', ingredient_id, ingredient.name, ingredient.description, ingredient.quantity FROM ingredient JOIN recipe ON ingredient.recipe_id = recipe.recipe_id WHERE recipe.recipe_id = :recipeId;"
	let params = {
		recipeId: recipe_id
	};
	console.log("get ind")
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

function deleteIngredient(ingredient_id, callback) {
	let sqlDeleteReview = "DELETE FROM ingredient where ingredient_id = :ingredientId";
	let params = {
		ingredientId: ingredient_id
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

module.exports = {getRecipes, addRecipe, deleteRecipe, deletePersonSkill, getIngredients, addReview, deleteIngredient, getRecipeById}
