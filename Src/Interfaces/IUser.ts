

export declare namespace IUser {
  interface Doc {
    _id?: any
    email: string
    name: string
    profile: string
    password?: string
  }
  interface Create {
    email: string
    name: string
    profile: string
    password?: string
  }
  interface Update {
    name?: string
    email?: string
    profile?: string
  }
}
