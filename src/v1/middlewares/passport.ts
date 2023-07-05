import passport from "passport";
import * as Strategy from "passport-jwt";

passport.use(
  new Strategy.Strategy(
    {
      jwtFromRequest: Strategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {}
  )
);
