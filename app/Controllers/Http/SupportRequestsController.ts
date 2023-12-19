import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SupportRequest from "App/Models/SupportRequest";
import User from "App/Models/User";

export default class SupportRequestsController {
  public async store({ request }: HttpContextContract) {
    const first_name = request.input("first_name");
    const last_name = request.input("last_name");
    const email = request.input("email");
    const title = request.input("title");
    const message = request.input("message");
    // const file = request.input('file')

    const userEmail = await User.findBy("email", email);

    const user = new User();
    if (!userEmail) {
      await user
        .fill({ fullName: `${first_name} ${last_name}`, email: email })
        .save();
    }

    const supportRequest = new SupportRequest();
    await supportRequest.fill({
      first_name: first_name,
      last_name: last_name,
      email: email,
      title: title,
      message: message,
      user_id: user.id || userEmail?.id,
    });

    return supportRequest;
  }
}
