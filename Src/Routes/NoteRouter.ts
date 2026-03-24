import express from "express"
import NoteController from "../Controller/NoteController"
import Authentication from "../Middlewares/Auth"
const NoteRouter = express.Router()
NoteRouter.use(Authentication.user)
NoteRouter.post("/", NoteController.create)
NoteRouter.patch("/:id", NoteController.update)
NoteRouter.get("/query", NoteController.query)
NoteRouter.delete("/:id", NoteController.delete)
export default NoteRouter
