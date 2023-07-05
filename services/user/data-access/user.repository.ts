import { IRepository, Repository } from "@learnbox/common";
import { UserDocument } from "./models/user.model";
import getDatabase from "./models/db.connection";

export default class UserRepository
  extends Repository<UserDocument>
  implements IRepository<UserDocument>
{
  constructor() {
    super(getDatabase(), "users");
  }
}
