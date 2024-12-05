//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

import {getUser, getUsers, createUser} from './database.js'

import express from 'express';
import cors from 'cors';

//Google authentication stuff
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

//Database
import {db} from './app/config/db.config.js';


import { gigRouter} from './app/routes/gigs.routes.js';
import {awardsRouter} from './app/routes/awards.routes.js';
import {projectsRouter} from './app/routes/projects.routes.js';


try{
  await db.authenticate();
  console.log('Connection has been established successfully');

}
catch(error){
  console.error('Unable to connect to the database:', error);
}


const app = express();

app.use(express.json())
app.use(
  session({
    secret:"secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken,profile,done) =>{
  return done(null,profile);
}
));

passport.serializeUser((user,done) => done(null,user));
passport.deserializeUser((user,done)=> done(null,user));

app.get('/',(req,res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/auth/google",passport.authenticate('google',{scope:["profile","email"]})

);


app.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:"/"}), (req,res) =>{
  res.redirect('/profile')
})

app.get("/profile",(req,res)=>{
  res.send(`Welcome ${req.user.displayName}`);
});

app.get("/logout",(req,res)=>{
  req.logout(()=>{
    res.redirect("/");
  });
  
});

// app.get("/Users",async(req,res)=>{
//   const users = await getUsers()
//   res.send(users)
// })

// app.get("/Users/:id",async(req,res)=>{
//   const id = req.params.id
//   const user = await getUser(id)
//   res.send(user)
// })

// app.post("/Users",async(req,res)=>{
//   const {name,email} = req.body
//   const user = await createUser(name,email)
//   res.status(201).send(user)
// })

app.listen(3000,()=>{
  console.log('server is running at port 3000');
});


// actual app functionalities
app.use('/gigs',gigRouter);
app.use('/awards',awardsRouter);
app.use('/projects', projectsRouter);


app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).send('Something broke!')
});