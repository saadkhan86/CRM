import { Types } from "mongoose";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import AdminInterface from "../Interfaces/AdminInterface";
import signToken from "../Middlewares/Token";
import Admin from "../Models/Admin";
import bcrypt from "bcrypt";

class AdminRepo {
  public async create(data: AdminInterface.create) {
    let { name, email, password } = data;
    let user: any = {};
    if (!name || !email || !password) {
      throw new ErrorHandler(400, "please fill required fields");
    }
    const check = await Admin.findOne({ email });
    if (check) {
      throw new ErrorHandler(409, "Admin already exists Login please");
    }
    password = await bcrypt.hashSync(password, 5);
    const db = await Admin.create({ name, email, password });
    user = {
      token: await signToken(db._id),
      _id: db._id,
      name: db.name,
      email: db.email,
    };
    return user;
  }
  public async login(data: AdminInterface.login) {
    let user: any = {};
    let { email, password } = data;
    if (!email || !password) {
      throw new ErrorHandler(400, "please fill required fields");
    }

    const db = await Admin.findOne({ email }).select("+password");
    if (!db) {
      throw new ErrorHandler(404, "user not found with this email");
    }
    const matchPass = bcrypt.compareSync(password, db.password);
    if (!matchPass) {
      throw new ErrorHandler(401, "Either wrong email or password");
    }
    user = {
      token: await signToken(db._id),
      _id: db._id,
      name: db.name,
      email: db.email,
    };
    return user;
  }

  public async update(
    id: Types.ObjectId | string,
    data: AdminInterface.update
  ) {
    let db = await Admin.findById(id);
    if (!db) {
      throw new ErrorHandler(400, "User not provided");
    }
    db = await Admin.findByIdAndUpdate(
      id,
      { email: data.email, name: data.name, password: data.password },
      { new: true }
    );
    if (!db) {
      throw new ErrorHandler(500, "something went wrong");
    }
    const user = {
      token: await signToken(db._id),
      _id: db._id,
      name: db.name,
      email: db.email,
    };
    return user;
  }
}
export default new AdminRepo();
