import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async show({ request }: HttpContextContract) {
    // Shows multiple support requests with the same email address is linked to the same user.
    const email = request.input("email");
    console.log(email);
    const userEmail = await User.query()
      .where("email", email)
      .preload("support_requests");

    //   const user = await User.query().preload("support_requests");

    return userEmail;
  }
}
