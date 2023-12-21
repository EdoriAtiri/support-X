import { test } from "@japa/runner";

import SupportRequest from "App/Models/SupportRequest";

const testSupportRequest = {
  first_name: "Saul",
  last_name: "Paul",
  email: "saul@email.com",
  title: "test",
  message: "tests support request handling",
};
let testSupportRequestId;

test.group("Support request store", () => {
  test("support request was submitted", async ({ client }) => {
    const response = await client.post("/support").form(testSupportRequest);

    // console.log(response.body().id);

    // Assert that the submission was successful with status code of 200
    response.assertStatus(200);
    testSupportRequestId = response.body().id;

    // Verify that the data in response is the data in supportRequest submitted
    response.assertBodyContains(testSupportRequest);
  });

  test("support request persists /support/request", async ({ client }) => {
    const response = await client
      .post("/support/request")
      .form({ id: testSupportRequestId });

    response.assertBodyContains(testSupportRequest);
  });
});
