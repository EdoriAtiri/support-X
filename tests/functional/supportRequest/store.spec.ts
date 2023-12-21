import { test } from "@japa/runner";

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

    // Verify that the data in response is the data in supportRequest submitted
    response.assertBodyContains(mockSupportRequest);
  });

  test("support request persists /support/request", async ({ client }) => {
    const response = await client
      .post("/support/request")
      .form({ id: mockSupportRequestId });

    response.assertBodyContains(mockSupportRequest);
  });
});
