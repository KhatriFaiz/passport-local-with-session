import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to my web app!</h1><a href='/login'>Login</a>");
});

export default router;
