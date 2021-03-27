import Express from "express";
import { Recipe } from "../models/recipes.js";
import { recipes } from "../recipes.js";
const router = Express.Router();

router.use((req, res, next) => {
  console.log(req.url, "---", Date.now());
  req.time = Date.now();
  next();
});

router
  .route("/")
  .get(async (request, response) => {
    // console.log(request.query);

    // const queryMatch = request.query.ings
    //   ? recipes.filter(
    //       (recipe) =>
    //         request.query.like === `${recipe.like}` &&
    //         recipe.ings.includes(request.query.ings)
    //     )
    //   : recipes;
    // console.log(queryMatch);
    // response.send(queryMatch);

    try {
      const recipes = await Recipe.find();
      response.json(recipes);
    } catch (err) {
      response.send("Hello world4");
    }
  })
  .post(async (request, response) => {
    console.log(request.body);

    const recipe = new Recipe({
      title: request.body.title,
      ings: request.body.ings,
      like: request.body.like,
    });

    try {
      const newRecipe = await recipe.save();
      response.send(newRecipe);
    } catch (err) {
      response.send(err);
    }
  });

router.route("/:id").get((request, response) => {
  console.log("From id: ", request.time);
  const searchRecipe = recipes.find(
    (recipe) => recipe.id === +request.params.id
  );

  const searchFilterRecipe = recipes.filter(
    (recipe) => recipe.id === +request.params.id
  );

  console.log(searchRecipe, searchFilterRecipe);
  response.send(searchRecipe);
  // response.send(searchFilterRecipe);
});
export default router;
