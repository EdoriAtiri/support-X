import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import SupportRequest from "App/Models/SupportRequest";
import UsersController from "./UsersController";

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
      file: schema.file.nullableAndOptional({
        size: "2mb",
        extnames: ["jpg", "jpeg", "png", "gif"],
      }),
    });

    // Validate file in request with fileDataSchema
    const fileData = await request.validate({
      schema: fileDataSchema,
    });

    // get/create user
    const user = await new UsersController().newUser(
      email,
      `${first_name} ${last_name}`
    );

    // Save file to tmp
    if (fileData.file) {
      await fileData.file.move(Application.tmpPath(`${user.id}`));
    }

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
        userId: user.id,
        /*todo replace with fileData.file.filePath */
        file: fileData.file ? `tmp/${user.id}/${fileData.file.fileName}` : "",
      })
      .save();

    return supportRequest;
  }

  public async show({ request }: HttpContextContract) {
    const id = request.input("id");
    const supportRequest = await SupportRequest.find(id);

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
