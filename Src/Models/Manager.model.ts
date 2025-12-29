import mongoose from 'mongoose'
import IManager from '../Interfaces/IManager';
const Schema = mongoose.Schema
const ManagerSchema=new Schema<IManager.Doc>({
    role:{
        type:String,
        default:"manager",
        immutable:true
    },
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    }
},{timestamps:true})
export default mongoose.model<IManager.Doc>("Manager",ManagerSchema);
