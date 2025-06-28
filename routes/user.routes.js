import { Router } from "express";

const userRouter = Router();

userRouter.get("/", function (req, res) {
  res.send({ title: "GET all users." });
});

userRouter.get("/:id", function (req, res) {
  res.send({ title: "GET user details." });
});

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
