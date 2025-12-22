import { Document, Types } from "mongoose";

export declare namespace DealsInterface {
  interface Doc extends Document {
    title: string;
    customerId: Types.ObjectId | string;
    stage: "received" | "pending" | "won" | "lost";
  }
  interface create {
    title:string;
    customerId:Types.ObjectId|string;
    stage:"received" | "pending" | "won" | "lost";
  }
  interface update {
    customerId:Types.ObjectId|string;
    stage:"received" | "pending" | "won" | "lost";
  }
  interface remove{
    customerId:Types.ObjectId;
  }
}
export default DealsInterface;
