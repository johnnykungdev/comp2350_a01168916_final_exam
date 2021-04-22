const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getRecipes((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
					res.render('index', { allRecipes: result });

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});

router.post('/addRecipe', (req, res) => {
	console.log("form submit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log(req.body); 
			dbModel.addRecipe(req.body, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error writing to MySQL'});
					console.log("Error writing to mysql");
					console.log(err);
				}
				else { //success
					res.redirect("/");

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			
			dbConnection.release();
		}
	});

});

router.post('/deleteRecipe', (req, res) => {
	console.log("deleteRecipe");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log("req body", req.body.restaurant_id);

			let recipe_id = req.body.recipe_id;
			if (recipe_id) {
				//delete from person_skill where person_id = :person_id;
				dbModel.deleteRecipe(recipe_id, (err, result) => {
					if (err) {
						res.render('error', {message: 'Error writing to MySQL'});
						console.log("Error writing to mysql");
						console.log(err);
					}
					else { //success
						//delete from person where person_id = :person_id;
						dbModel.deleteRecipe(recipe_id, (err, result) => {
							if (err) {
								res.render('error', {message: 'Error writing to MySQL'});
								console.log("Error writing to mysql");
								console.log(err);
							}
							else { //success
								res.redirect("/");

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
});

router.get('/showIngredients', (req, res) => {
	console.log("get ingredient", req.query.id);
	const recipe_id = req.query.id
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getIngredients(req.query.id, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
					let recipeName

					dbModel.getRecipeById(recipe_id, (err, recipe) => {
						if (err) {
							res.render('error', {message: 'Error reading from MySQL'});
							console.log("Error reading from mysql");
							console.log(err);
						} else {
							console.log("recipie", recipe)
							recipeName = recipe[0].name

							res.render('ingredient', { allIngredients: result, recipe: recipeName, recipe_id: recipe_id });
						}
					})
					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

})

router.post('/deleteIngredient', (req, res) => {
	console.log("delete Ingredient");
	console.log("ingredient id", req.body);
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			

			let ingredient_id = req.body.ingredient_id;
			if (ingredient_id) {
				//delete from person_skill where person_id = :person_id;
				dbModel.deleteIngredient(ingredient_id, (err, result) => {
					if (err) {
						res.render('error', {message: 'Error writing to MySQL'});
						console.log("Error writing to mysql");
						console.log(err);
					}
					else { //success
						//delete from person where person_id = :person_id;
						dbModel.deleteIngredient(ingredient_id, (err, result) => {
							if (err) {
								res.render('error', {message: 'Error writing to MySQL'});
								console.log("Error writing to mysql");
								console.log(err);
							}
							else { //success
								res.redirect("/");

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
});

router.post('/addIngredient', (req, res) => {
	console.log("form submit");
	console.log("add ingredient", req.body);

	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			const postData = {
				...req.body,
				recipe_id: Number(req.body.recipe_id)
			}
			dbModel.addIngredient(postData, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error writing to MySQL'});
					console.log("Error writing to mysql");
					console.log(err);
				}
				else { //success
					res.redirect("/");

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			
			dbConnection.release();
		}
	});

});

module.exports = router;
