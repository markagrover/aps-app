### Setting up O-AUTH in a Node Project


#### Finding Google OAuthAPI for enabling
    You must search google plus in the API section of googel.

    Once enabled click on credentials in the ledt column then continue on.

#### Code used in setting up O Auth google
```
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
     new GoogleStrategy(
       {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback'
       },
       // This is the call back function required by google
         (accessToken, refreshToken, profile, done) => {
         console.log("AccessToken: ",accessToken);
         console.log("RefreshToken: ",refreshToken);
         console.log("Profile: ",profile);
         done();
       }
     )
   );

   app.get(
     '/auth/google',
     passport.authenticate('google', {
       scope: ['profile', 'email'] // scope is an array of permissions we need approved
     })
   );
    // In order for this to work you must specify the redirect urls in the console.google.developers area.
   app.get('/auth/google/callback', passport.authenticate('google'));
```