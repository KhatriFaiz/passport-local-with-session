import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User.model.ts";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      console.log(user);

      if (!user) return done(null, false);
      if (!user.verifyPassword(password)) return done(null, false);
      done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, {
      id: "11",
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, {});
  });
});

export { passport };
