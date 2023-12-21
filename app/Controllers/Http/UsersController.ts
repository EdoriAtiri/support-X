import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index() {
    const users = await User.query().preload("support_requests");
    return users;
  }

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

  public async newUser(email, fullName) {
    // Get user via email
    const existingUser = await User.findBy("email", email);

    // If the existingUser does not belong to a user create a new user
    if (!existingUser) {
      // Instantiate new user
      const user = new User();

      await user.fill({ fullName: fullName, email: email }).save();

      return user;
    }

    return existingUser;
  }
}
