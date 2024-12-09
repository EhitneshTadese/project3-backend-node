import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = express.Router();

// Configure the Google strategy for use by Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Here you would find or create a user in your database
    // For example:
    // User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //     return done(err, user);
    // });
    return done(null, profile); // For now, just return the profile
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initialize session
router.use(express.session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

// Route to start the Google authentication process
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login' // Redirect to login if authentication fails
}), (req, res) => {
    // Successful authentication, redirect home or send a response
    res.redirect('/home'); // Redirect to your home page or send a success response
});

export default router;
