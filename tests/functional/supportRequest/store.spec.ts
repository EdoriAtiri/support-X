import { test } from "@japa/runner";
import Drive from "@ioc:Adonis/Core/Drive";
import { file } from "@ioc:Adonis/Core/Helpers";

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
    const fakeDrive = Drive.fake();

    // Creating a fake file to upload
    const test_file = await file.generatePng("1mb");

    console.log("File Contents:", test_file.contents); // Log the file contents

    const response = await client
      .post(`/support`)
      .fields(mockSupportRequest)
      .file("file", test_file.contents, { filename: test_file.name });

    // Log the response for debugging
    console.log("Upload Response:", response.text());
    console.log("file name:", test_file.name);

    const filePath = `tmp/${response.body().user_id}/${test_file.name}`;

    // Assert that file in response body for the upload matches the expected file path
    assert.isTrue(filePath === response.body().file);

    // // Assert the file was uploaded successfully
    // assert.isTrue(await fakeDrive.exists(test_file.name));

    // Restore the Drive fake
    Drive.restore();
  });
});
