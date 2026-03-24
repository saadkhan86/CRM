import { IUser } from "../Interfaces/IUser"

declare global {
  namespace Express {
    interface Request {
      user?: IUser.Doc
    }
  }
}
