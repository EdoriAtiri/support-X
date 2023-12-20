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

import Route from "@ioc:Adonis/Core/Route";
import SupportRequestsController from "App/Controllers/Http/SupportRequestsController";

Route.post("/support", "SupportRequestsController.store");

Route.get("/user", "UsersController.index");

Route.post("/user", "UsersController.show");

Route.post("/upload", "SupportRequestsController.handleFileUpload");

// Route.post("/upload", async (ctx) => {
//   return new SupportRequestsController().handleFileUpload(ctx);
// });
