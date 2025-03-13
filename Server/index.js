const express = require("express");
require("dotenv").config();
const app = express();
const { connectDatabase } = require("./db");
const { router } = require("./routes");
const { User } = require("./model/user-model");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://auth-2-self.vercel.app"], // Allow local and deployed frontend
    credentials: true, // Required for cookies and sessions
  })
);
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: "Harsh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true }, // Secure cookie in production
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDatabase("mongodb+srv://sumit:sumit@cluster0.gvjdh.mongodb.net/auth");

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://auth-v1-lahf.onrender.com/auth/google/callback", // ✅ Updated Backend URL
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user); // User exists, proceed with login
        }

        // Create a new user if not found
        user = new User({
          googleId: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Passport serialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => res.redirect(`${process.env.CLIENT_URL}`));
});

// Get User Info
app.get("/user", (req, res) => res.send(req.user));

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);