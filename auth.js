// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";

// const GOOGLE_CLIENT_ID =
//   "10175586703-6qkm30m5njmbprrjva0l0mfakr8p0q9t.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });
