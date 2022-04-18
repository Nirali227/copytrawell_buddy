const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      // return done(null, profile)
      const account = profile._json;
      try {
        const currentUserQuery = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [profile.id]
        );

        if (currentUserQuery.rows.length === 0) {
          // create user if not exists.
          await pool.query(
            "INSERT INTO users (google_id, email, displayname, firstname, lastname, picture) VALUES ($1,$2,$3,$4,$5,$6)",
            [profile.id, account.email, account.name, account.given_name, account.family_name, account.picture]
          );
        }

        done(null, profile);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user);
});

