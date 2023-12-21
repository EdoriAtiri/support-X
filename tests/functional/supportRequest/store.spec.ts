import { test } from "@japa/runner";

import SupportRequest from "App/Models/SupportRequest";

const testSupportRequest = {
  first_name: "Saul",
  last_name: "Paul",
  email: "saul@email.com",
  title: "test",
  message: "tests support request handling",
};

test.group("Support request store", () => {
  test("support request was submitted and persists /support", async ({
    client,
  }) => {
    const response = await client.post("/support").form(testSupportRequest);

    // console.log(response.body().id);

    // Assert that the submission was successful with status code of 200
    response.assertStatus(200);

    // Verify that the data in response is the data in supportRequest submitted
    response.assertBodyContains({
      first_name: testSupportRequest.first_name,
      last_name: testSupportRequest.last_name,
      email: testSupportRequest.email,
      title: testSupportRequest.title,
      message: testSupportRequest.message,
    });

    const testRequest = await SupportRequest.findBy("id", response.body().id);
    response.assertBodyContains({
      id: testRequest!.id,
      first_name: testRequest!.first_name,
      last_name: testRequest!.last_name,
      title: testRequest!.title,
      message: testRequest!.message,
    });
  });
});
