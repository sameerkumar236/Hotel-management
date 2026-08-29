import passport from "passport";
import Person from "./models/Person.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
    new LocalStrategy(async (username, password, done) => {

        const user = await Person.findOne({ username });

        if (!user) {
            return done(null, false, {
                message: "Incorrect username"
            });
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (checkPassword) {
            return done(null, user);
        }

        return done(null, false, {
            message: "Incorrect password"
        });
    })
);

export default passport;