import admin from "firebase-admin"
import serviceAccount from "./Firebase.Service.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
})

export default admin
