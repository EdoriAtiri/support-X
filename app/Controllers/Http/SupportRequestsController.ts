import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import SupportRequest from "App/Models/SupportRequest";
import User from "App/Models/User";

export default class SupportRequestsController {
  public async store({ request }: HttpContextContract) {
    const first_name = request.input("first_name");
    const last_name = request.input("last_name");
    const email = request.input("email");
    const title = request.input("title");
    const message = request.input("message");
    // const file = request.file('file')

    // Handle file upload
    // Create file schema
    const fileDataSchema = schema.create({
      file: schema.file({
        size: "2mb",
        extnames: ["jpg", "png", "gif"],
      }),
    });

    // Validate file in request with fileDataSchema
    const fileData = await request.validate({
      schema: fileDataSchema,
    });

    // Save file to tmp
    await fileData.file.move(Application.tmpPath("file-upload"));

    const userEmail = await User.findBy("email", email);

    const user = new User();
    if (!userEmail) {
      await user
        .fill({ fullName: `${first_name} ${last_name}`, email: email })
        .save();
    }

    const supportRequest = new SupportRequest();
    await supportRequest
      .fill({
        first_name: first_name,
        last_name: last_name,
        email: email,
        title: title,
        message: message,
        userId: user.id || userEmail?.id,
        file: `tmp/file-upload/${fileData.file.clientName}`,
      })
      .save();

    return supportRequest;
  }

  //   public async handleFileUpload({ request, response }: HttpContextContract) {
  //     const fileDataSchema = schema.create({
  //       file: schema.file({
  //         size: "2mb",
  //         extnames: ["jpg", "png", "gif"],
  //       }),
  //     });

  //     const fileData = await request.validate({
  //       schema: fileDataSchema,
  //     });
  //     console.log(fileData.file.clientName);

  //     await fileData.file.move(Application.tmpPath("file-upload"));

  //     /* const file = request.file("file", {
  //         extnames: ["jpg", "gif"],
  //       });

  //     if (!file || !file.isValid)
  //      return response.send({ message: "problem with file" });

  //     await file.move(Application.tmpPath("file-upload"));
  //     */

  //     return response.created({
  //       message: "File uploaded",
  //     });
  //   }
}
