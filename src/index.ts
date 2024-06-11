import express from "express";
import { connectDatabase } from "./config/database.ts";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import routes from "./routes/index.ts";
import { passport } from "./config/passport.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

async function startServer() {
  try {
    await connectDatabase();
    app.use(
      session({
        secret: "keyboard",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
          client: mongoose.connection.getClient(),
        }),
        cookie: {
          maxAge: 1000 * 60 * 10,
        },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(routes);
    app.listen(PORT, () => {
      console.log("server is running at port:", PORT);
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

startServer();
