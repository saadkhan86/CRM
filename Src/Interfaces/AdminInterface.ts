import { Document } from "mongoose";

export declare namespace AdminInterface {
  interface Doc extends Document {
    name: string;
    password: string;
    email: string;
  }
  interface create {
    name: Doc["name"];
    password: Doc["password"];
    email: Doc["email"];
  }
  interface login {
    email: Doc["name"];
    password: Doc["password"];
  }
  interface update {
    name?: Doc["name"];
    password?: Doc["password"];
    email?: Doc["email"];
  }
}
export default AdminInterface;
