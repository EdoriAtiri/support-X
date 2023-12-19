/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { HttpContext } from "@adonisjs/core/build/standalone";
import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";

const user = new User();

Route.post("/", async ({ request }: HttpContext) => {
  const fullName = request.input("fullName");
  const email = request.input("email");
  await user.fill({ fullName: fullName, email: email }).save();
});

Route.get("/", async () => {
  const user = await User.all();
  return { hello: user };
});
