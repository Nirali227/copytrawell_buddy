const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./auth");
const pool = require("./db");

// Order of the below w3 lines is important
// Order of the below w3 lines is important

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); //added later

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: true,
  }),
  (_, res) => {
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

// Middleware
function isLoggedIn(req, res, next) {
  if (req.user) next();
  else {
    res.json({ loggedIn: false });
  }
}

// ROUTES
app.get("/account", isLoggedIn, (req, res) => {
  const user = {
    ...req.user,
    loggedIn: true,
  };
  res.json(user);
});

app.post("/new_post", isLoggedIn, async (req, res) => {
  await pool.query(
    "INSERT INTO journeys (train_id, departure, departure_date, arrival, arrival_date, pnr, booking_status, traveller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      req.body.train_id,
      req.body.departure,
      req.body.departure_date,
      req.body.arrival,
      req.body.arrival_date,
      req.body.pnr,
      req.body.booking_status,
      req.user.id,
    ]
  );
  res.status(200).send();
});

app.get("/feed", isLoggedIn, async (req, res) => {
  const cursor = req.query.cursor;
  const posts = await pool.query(
    "SELECT train_id, departure, departure_date, arrival_date, arrival, pnr, booking_status from journeys WHERE traveller_id = $1 ORDER BY departure_date DESC OFFSET $2",
    [req.user.id, cursor]
  );
  res.send({ cursor: cursor * 1 + 5, posts: posts.rows });
});

app.get("/search", isLoggedIn, async (req, res) => {
  const cursor = req.query.cursor || 0;
  const searchQuery = req.query.s || "";
  const posts = await pool.query(
    "SELECT u.email, u.displayname, j.train_id, j.departure, j.departure_date, j.arrival, j.arrival_date, j.pnr, j.booking_status from journeys as j, users u WHERE CASE WHEN $1 = '' then true else LOWER(j.departure) = LOWER($1) end AND u.google_id = j.traveller_id AND NOT u.google_id = $3 ORDER BY departure_date DESC OFFSET $2",
    [searchQuery, cursor, req.user.id]
  );
  res.send({ cursor: cursor * 1 + 2, posts: posts.rows });
});

app.get("/my_posts", isLoggedIn, async (req, res) => {
  const cursor = req.query.cursor;
  const posts = await pool.query(
    // "SELECT * from users WHERE google_id = $1", [req.user.id]
    "SELECT email, displayname, picture from users WHERE google_id = $1",
    [req.user.id]
  );
  res.send({ cursor: cursor * 1 + 5, posts: posts.rows });
});

app.listen(process.env.APP_PORT, () => console.log("listening on port: 8081"));
