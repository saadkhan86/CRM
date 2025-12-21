import ErrorHandler from "../ErrorHandler/ErrorHandler";
import CustomerInterface from "../Interfaces/CustomerInterface";
import Customer from "../Models/Customer";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
class CustomerRepo {
  public async create(data: CustomerInterface.create) {
    const user = await Customer.findOne({ email: data.email });
    if (user) {
      throw new ErrorHandler(409, "user alredy exists");
    }
    data.password = await bcrypt.hash(data.password, 5);
    const db = new Customer(data);
    return await db.save();
  }

  public async update(
    id: Types.ObjectId | string,
    data: CustomerInterface.update
  ) {
    const oldCustomer = await Customer.findById(id);
    if (!oldCustomer) {
      throw new ErrorHandler(404, "User not found");
    }
    const updateObject: any = {};
    const availableFields = [
      "name",
      "email",
      "password",
      "contact",
      "organization",
      "position",
    ] as const;
    availableFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        if (data[field] !== oldCustomer[field]) {
          updateObject[field] = data[field];
        }
      }
    });
    if (Object.keys(updateObject).length === 0) {
      return oldCustomer;
    }
    const db = await Customer.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true }
    );
    return db;
  }

  public async delete(id: Types.ObjectId | string) {
    const db = await Customer.findByIdAndDelete(id);
    if (!db) {
      throw new ErrorHandler(404, "user not found");
    }
    return db;
  }

  public async query(query: any) {
    let searchQuery: any;
    const page:number=Number(query.page)?Number(query.page):1;
    const limit:number=Number(query.limit)?Number(query.limit):10;
    if (typeof query.search === "string" && query.search.trim()) {
      const search = query.search.trim();
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          {position:{$regex:search,$options: "i" }},
          {organization:{$regex:search,$options:"i"}}
        ],
      };
    }else{
      searchQuery={}
    }
    const db = await Customer.find(searchQuery)
      .sort({ name: query.order ? query.order : 1 })
      .select("-password")
      .skip((page-1)*limit)
      .limit(limit)
      .lean();
    if (db.length === 0) {
      throw new ErrorHandler(404, "No user exist in your Database");
    }
    return db;
  }

  public async querySpecific(id: Types.ObjectId | string) {
    const db = await Customer.findById(id).select("-password");
    if (!db) {
      throw new ErrorHandler(404, "user doest not exists");
    }
    return db;
  }
}
export default new CustomerRepo();
