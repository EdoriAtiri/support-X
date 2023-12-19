import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class SupportRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public email: string;

  @column()
  public title: string;

  @column()
  public message: string;

  @column()
  public file: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
