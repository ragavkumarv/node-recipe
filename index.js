// const good = require("./good.js");
// import  good from "./good.js"; 1
// import { good } from "./good.js"; 2

import cors from "cors";
import Express from "express";
import router from "./routes/recipes.js";

const app = Express();

const port = 3200;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/recipes", router);
// app.use("/price", router);
// app.use("/comments", router);

app.get("/", (request, response) => {
  response.send("Hello world4");
});

// CRUD -> Create Read Update Delete

app.listen(port, () => console.log("Started"));
