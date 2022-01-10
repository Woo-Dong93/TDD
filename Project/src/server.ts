import express, { Request, Response, NextFunction } from "express";
import moongose from "mongoose";
import router from "./routes";

const url = "mongodb URL";

moongose
  .connect(url)
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/api", router);

// 에러 핸들러
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
