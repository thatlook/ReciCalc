/*
 * Proposed schemata:
 * 
 * recipes SCHEMA:
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR NOT NULL,
 *   description TEXT,
 *   top_ingredients TEXT,
 *   instructions JSON,
 * 
 * 
 * ingredients SCHEMA:
 *   ndbno INT PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   std_amount INT NOT NULL,
 *   std_measure TEXT NOT NULL,
 *   kcal_per INT,
 *   fat_per INT,
 *   sat_fat_per INT,
 *   fiber_per INT,
 *   cholesterol_per INT,
 *   sodium_per INT,
 *   carbs_per INT,
 *   sugar_per INT,
 *   protein_per INT
 * 
 * recipe_ingredients SCHEMA:
 *   id SERIAL PRIMARY KEY,
 *   recipe_id INT, 
 *   food_no INT, 
 *   quantity INT
 *   quantity_measure VARCHAR
 *   list_position INT
 *   FOREIGN KEY food_no REFERENCES ingredients(ndbno)
 *   FOREIGN KEY recipe_id REFERENCES recipes(id)
 */