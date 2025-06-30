import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", function (req, res) {
  res.send({ title: "CREATE new user." });
});

userRouter.post("/:id", function (req, res) {
  res.send({ title: "UPDATE user." });
});

userRouter.delete("/:id", function (req, res) {
  res.send({ title: "DELETE user." });
});

export default userRouter;
