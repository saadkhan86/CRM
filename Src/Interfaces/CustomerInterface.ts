import { Document } from "mongoose";

export declare namespace CustomerInterface {
  interface Doc extends Document {
    name: string;
    email: string;
    organization: string;
    password: string;
    contact: string;
    position:string;
  }
  interface create {
    position:string;
    contact: string;
    name: string;
    email: string;
    organization: string;
    password: string;
  }
  interface update {
    position:string;
    contact: string;
    name: string;
    email: string;
    organization: string;
    password: string;
  }
  interface query{
    page?:number;
    order?:string | any;
    search?:string;
    limit?:number;
  }
}

export default CustomerInterface;
