import { test } from "@japa/runner";

test.group("Support request store", () => {
  test("support request was submitted and persists /support", async ({
    client,
  }) => {
    const supportRequest = {
      first_name: "Saul",
      last_name: "Paul",
      email: "saul@email.com",
      title: "test",
      message: "tests support request handling",
    };
    const response = await client.post("/support").form(supportRequest);

    console.log(response.body());

    // Assert that the submission was successful with status code of 200
    response.assertStatus(200);

    // Verify that the data in response is the data in supportRequest submitted
    response.assertBodyContains({
      first_name: "Saul",
      last_name: "Paul",
      email: "saul@email.com",
      title: "test",
      message: "tests support request handling",
    });
  });
});
