import { Request, Response, Router } from "express";
import { passport } from "../config/passport.ts";
import { User } from "../models/User.model.ts";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send(
    "<h1>Login</h1><form action='/login' method='POST'><input placeholder='username' name='username' /><input placeholder='password' type='password' name='password' /><button>Submit</button></form>"
  );
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/login-successful",
  }),
  async (req: Request, res: Response) => {
    res.redirect("/login-successful");
  }
);

router.get("/login-successful", (req: Request, res: Response) => {
  return res.send("<h1>Login Successful</h1>");
});

router.get("/register", (req: Request, res: Response) => {
  return res.send(
    "<h1>Register</h1><form action='/users' method='POST'><input placeholder='username' name='username' /><input placeholder='password' type='password' name='password' /><button>Register</button></form>"
  );
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
