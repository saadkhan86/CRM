import { create } from 'node:domain';
import { Document } from "mongoose";

export declare namespace IManager{
    interface Doc extends Document{
        name:String,
        email:String,
        role:String
    }
    interface create {
        name:String,
        email:String
    }
    interface update{
        name?:string,
        email?:string
    }
}
export default IManager