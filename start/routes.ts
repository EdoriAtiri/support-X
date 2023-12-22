import Route from "@ioc:Adonis/Core/Route";

Route.post("/support", "SupportRequestsController.store");
Route.post("/support/request", "SupportRequestsController.show");

Route.get("/user", "UsersController.index");

Route.post("/user", "UsersController.show");

Route.get("/", async ({ view }) => {
  return view.render("home");
});

// import SupportRequestsController from "App/Controllers/Http/SupportRequestsController";
// Route.post("/upload", "SupportRequestsController.handleFileUpload");
// Route.post("/upload", async (ctx) => {
//   return new SupportRequestsController().handleFileUpload(ctx);
// });
