import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import SupportRequest from "App/Models/SupportRequest";
import User from "App/Models/User";

export default class SupportRequestsController {
  public async store({ request }: HttpContextContract) {
    // Support request schema
    const supportRequestSchema = schema.create({
      first_name: schema.string(),
      last_name: schema.string(),
      title: schema.string(),
      message: schema.string(),
      email: schema.string({ trim: true }, [rules.email()]),
    });

    // Validate new support request data with schema
    const supportRequestData = await request.validate({
      schema: supportRequestSchema,
    });

    // Destructure support request data
    const { first_name, last_name, title, message, email } = supportRequestData;

    // Handle file upload - Create file schema
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

    // Get user via email
    const existingUser = await User.findBy("email", email);

    // Instantiate new user
    const user = new User();

    // If the existingUser does not belong to a user create a new user
    if (!existingUser) {
      await user
        .fill({ fullName: `${first_name} ${last_name}`, email: email })
        .save();
    }

    // Save file to tmp
    await fileData.file.move(
      Application.tmpPath(`${existingUser?.id || user.id}`)
    );

    // Instantiate new supportRequest
    const supportRequest = new SupportRequest();

    // Fill and save the supportRequest
    await supportRequest
      .fill({
        first_name: first_name,
        last_name: last_name,
        email: email,
        title: title,
        message: message,
        userId: existingUser?.id || user.id,
        /*todo replace with fileData.file.filePath */
        file: `tmp/${existingUser?.id || user.id}/${fileData.file.fileName}`,
      })
      .save();

    return supportRequest;
  }

  // public async handleFileUpload({ request, response }: HttpContextContract) {
  //   const fileDataSchema = schema.create({
  //     file: schema.file({
  //       size: "2mb",
  //       extnames: ["jpg", "png", "gif"],
  //     }),
  //   });

  //   const fileData = await request.validate({
  //     schema: fileDataSchema,
  //   });

  //   await fileData.file.move(Application.tmpPath("file-upload"));
  //   console.log(fileData.file.fileName);

  //   /* const file = request.file("file", {
  //         extnames: ["jpg", "gif"],
  //       });

  //     if (!file || !file.isValid)
  //      return response.send({ message: "problem with file" });

  //     await file.move(Application.tmpPath("file-upload"));
  //     */

  //   return response.created({
  //     message: "File uploaded",
  //   });
  // }
}
