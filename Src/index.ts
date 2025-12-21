import express, { NextFunction, Request, Response } from "express";
import router from "./Routes/router";
import connetion from "./Connetions/MongoDB";
connetion();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((error: any, req: Request, res: Response,next:Function) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || "something went wrong",
  });
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
