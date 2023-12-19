import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "support_requests";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("email").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
