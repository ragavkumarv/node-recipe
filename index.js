// const good = require("./good.js");
// import  good from "./good.js"; 1
// import { good } from "./good.js"; 2

import cors from "cors";
import Express from "express";
import { recipes } from "./recipes.js";

const app = Express();

const port = 3200;

app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello world4");
});

app.get("/recipes", (request, response) => {
  console.log(request.query);

  const queryMatch = request.query.ings
    ? recipes.filter(
        (recipe) =>
          request.query.like === `${recipe.like}` &&
          recipe.ings.includes(request.query.ings)
      )
    : recipes;
  console.log(queryMatch);
  response.send(queryMatch);
});

app.get("/recipes/:id", (request, response) => {
  console.log(request.params.id);
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

app.listen(port, () => console.log("Started"));
