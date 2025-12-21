import { Document } from "mongoose";

export declare namespace CustomerInterface {
  interface Doc extends Document {
    name: string;
    email: string;
    organization: string;
    password: string;
    contact: string;
    position: string;
    orderStatus: "received" | "delivered" | "pending";
  }
  interface create {
    orderStatus: "received" | "delivered" | "pending";
    position: string;
    contact: string;
    name: string;
    email: string;
    organization: string;
    password: string;
  }
  interface update {
    orderStatus: "received" | "delivered" | "pending";
    position: string;
    contact: string;
    name: string;
    email: string;
    organization: string;
    password: string;
  }
  interface query {
    orderStatus?: 'received'|'delivered'|'pending';
    page?: number;
    order?: number | any;
    search?: string;
    limit?: number;
  }
}

export default CustomerInterface;
