const passport = require("passport");
const LocalStraetgy = require("passport-local").Strategy;
const Person = require("../model/Person");

//By default, Passport expects username and password, but you can customize these names as needed.
passport.use(
  new LocalStraetgy(
    { usernameField: "UserName", passwordField: "PassWord" },
    async (UserName, PassWord, done) => {
      //authentication Logic here
      try {
        const user = await Person.findOne({ username: UserName });

        if (!user) return done(null, false, { message: "Incorrect Username" });

        const isPasswordMatch = await user.comparePassword(PassWord);

        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
