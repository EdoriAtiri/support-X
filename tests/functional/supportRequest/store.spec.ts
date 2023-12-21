import { test } from "@japa/runner";
import { file } from "@ioc:Adonis/Core/Helpers";
import fs from "fs";
import path from "path";

const mockSupportRequest = {
  first_name: "Saul",
  last_name: "Paul",
  email: "saul@email.com",
  title: "test",
  message: "tests support request handling",
};
let mockSupportRequestId;

test.group("Support request store", () => {
  test("support request was submitted", async ({ client }) => {
    const response = await client.post("/support").form(mockSupportRequest);

    // Assert that the submission was successful with status code of 200
    response.assertStatus(200);
    mockSupportRequestId = response.body().id;

    // // Assert file path in response
    // response.assertBodyContains({
    //   file: `tmp/${mockSupportRequestId}/test-image.jpg`,
    // });

    // Verify that the data in response is the data in supportRequest submitted
    response.assertBodyContains(mockSupportRequest);
  });

  test("support request persists /support/request", async ({ client }) => {
    const response = await client
      .post("/support/request")
      .form({ id: mockSupportRequestId });

    response.assertBodyContains(mockSupportRequest);
  });

  test("a user can upload a file", async ({ client, assert }) => {
    // Create a fake file to upload
    const test_file = await file.generatePng("1mb");

    const response = await client
      .post(`/support`)
      .fields(mockSupportRequest)
      .file("file", test_file.contents, { filename: test_file.name });

    const root = path.resolve(__dirname, "../../../");
    const dirPath = `/tmp/${response.body().user_id}`;
    const filePath = path.join(root, dirPath, test_file.name);

    const isFileExist = await fs.existsSync(filePath);
    assert.isTrue(await isFileExist);
  });
});
