const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const { use } = require("passport");
const passport = require("passport");
const User = require("./models/User");
const RoleModel = require("./models/Role");
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8800/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // Có tài khoản đăng nhập
        let user = await User.findOne({
          email: profile._json.email,
          password: { $exists: true },
        });
        if (user) return cb(null, false);

        // Có tài khoản ko mk
        user = await User.findOne({
          email: profile._json.email,
          password: null,
        });
        console.log(user);
        if (user) {
          const userRole = await RoleModel.findOne(
            { role_code: user.role_code },
            "title"
          );
          console.log(userRole);
          return cb(null, { ...user._doc, role: userRole.title });
        }

        // tạo mới account vào db
        if (!user) {
          const { name, email, picture } = profile._json;
          console.log("create");
          const newUser = new User({
            email: email,
            avatar: { filename: picture },
            fullname: name,
          });
          const savedUser = await newUser.save();
          return cb(null, { ...savedUser, role: "customer" });
        }
      } catch (err) {
        // console.log(err);
        return cb(err);
      }
    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
