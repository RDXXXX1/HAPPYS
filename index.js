

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// require('dotenv').config();
// const promptRoutes = require('./routes/promptRoutes');
// const User = require('./models/User'); // Import the User model

// const app = express();

// // CORS setup with credentials
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type, Authorization'
// }));

// // Use sessions to keep track of the user
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false, // Set to true if using HTTPS
//     sameSite: 'lax'
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.json()); // For parsing application/json

// app.use('/api', promptRoutes);

// // Configure Google OAuth Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/google/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   console.log('Google OAuth callback function called');
//   console.log('Profile:', profile); // Log the entire profile object

//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
//       user = new User({
//         googleId: profile.id,
//         email: profile.emails[0]?.value,
//         displayName: profile.displayName,
//         picture: profilePicture // Save the profile picture URL
//       });
//       await user.save();
//       console.log('New user created:', user);
//     } else {
//       if (profile.emails[0]?.value && user.email !== profile.emails[0]?.value) {
//         user.email = profile.emails[0]?.value;
//       }
//       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
//       if (profilePicture && user.picture !== profilePicture) {
//         user.picture = profilePicture;
//       }
//       await user.save();
//       console.log('User updated:', user);
//     }
//     done(null, user);
//   } catch (error) {
//     console.error('Error during Google OAuth callback:', error);
//     done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   console.log('Serializing user:', user.id);
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   console.log('Deserializing user:', id);
//   try {
//     const user = await User.findById(id);
//     console.log('User deserialized:', user);
//     done(null, user);
//   } catch (error) {
//     console.error('Error retrieving user during deserialization:', error);
//     done(error, null);
//   }
// });

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Google OAuth routes
// app.get('/auth/google', (req, res, next) => {
//   console.log('Initiating Google OAuth authentication');
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login-failed' }),
//   (req, res) => {
//     console.log('Google OAuth callback received');
//     req.session.user = req.user; // Example: Saving user to session
//     console.log('User authenticated:', req.user);
//     res.redirect('http://localhost:3000'); // Redirect to the user page
//   }
// );

// // Failure route for debugging
// app.get('/login-failed', (req, res) => {
//   console.log('Google OAuth authentication failed.');
//   res.send('Google OAuth authentication failed.');
// });

// // Endpoint to get user data
// app.get('/api/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     console.log('User data being sent to frontend:', req.user);
//     res.json({
//       name: req.user.displayName || req.user.email,
//       picture: req.user.picture || 'default-avatar-url',
//       email: req.user.email,
//       googleId: req.user.googleId
//     });
//   } else {
//     res.status(401).json({ error: 'User not authenticated' });
//   }
// });

// // Add this route to handle logout
// app.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error('Error logging out:', err);
//       return res.status(500).send('Could not log out.');
//     }
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Error destroying session:', err);
//         return res.status(500).send('Could not log out.');
//       }
//       res.clearCookie('connect.sid'); // Clear the session cookie
//       res.redirect('http://localhost:3000'); // Redirect to the homepage or login page
//     });
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




































// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// const MongoStore = require('connect-mongo'); // Import connect-mongo
// require('dotenv').config();
// const promptRoutes = require('./routes/promptRoutes');
// const User = require('./models/User'); // Import the User model
// const userRoutes=require('./routes/userRoutes')
// const app = express();

// // CORS setup with credentials
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type, Authorization'
// }));

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Use sessions to keep track of the user
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: mongoURI, // Use the same MongoDB URI for session storage
//     collectionName: 'sessions', // Collection name where sessions will be stored
//     ttl: 14 * 24 * 60 * 60 // Expire sessions after 14 days
//   }),
//   cookie: {
//     httpOnly: true,
//     secure: false, // Set to true if using HTTPS
//     sameSite: 'lax'
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.json()); // For parsing application/json

// app.use('/api', promptRoutes);
// app.use('/api', userRoutes);
// // Configure Google OAuth Strategy
// // passport.use(new GoogleStrategy({
// //   clientID: process.env.GOOGLE_CLIENT_ID,
// //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //   callbackURL: "http://localhost:5000/auth/google/callback"
// // },
// // async (accessToken, refreshToken, profile, done) => {
// //   // console.log('Google OAuth callback function called');
// //   // console.log('Profile:', profile); // Log the entire profile object

// //   try {
// //     let user = await User.findOne({ googleId: profile.id });
// //     if (!user) {
// //       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
// //       user = new User({
// //         googleId: profile.id,
// //         email: profile.emails[0]?.value,
// //         displayName: profile.displayName,
// //         picture: profilePicture // Save the profile picture URL
// //       });
// //       await user.save();
// //       console.log('New user created:', user);
// //     } else {
// //       if (profile.emails[0]?.value && user.email !== profile.emails[0]?.value) {
// //         user.email = profile.emails[0]?.value;
// //       }
// //       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
// //       if (profilePicture && user.picture !== profilePicture) {
// //         user.picture = profilePicture;
// //       }
// //       await user.save();
// //       console.log('User updated:', user);
// //     }
// //     done(null, user);
// //   } catch (error) {
// //     console.error('Error during Google OAuth callback:', error);
// //     done(error, null);
// //   }
// // }));


// // In your Google OAuth callback
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/google/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
//       user = new User({
//         googleId: profile.id,
//         email: profile.emails[0]?.value,
//         displayName: profile.displayName,
//         picture: profilePicture,
//         tokensUsed: 0 // Initialize tokensUsed for new users
//       });
//       await user.save();
//       console.log('New user created:', user);
//     } else {
//       // Update existing user details
//       if (profile.emails[0]?.value && user.email !== profile.emails[0]?.value) {
//         user.email = profile.emails[0]?.value;
//       }
//       const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
//       if (profilePicture && user.picture !== profilePicture) {
//         user.picture = profilePicture;
//       }
//       await user.save();
//       console.log('User updated:', user);
//     }
//     done(null, user);
//   } catch (error) {
//     console.error('Error during Google OAuth callback:', error);
//     done(error, null);
//   }
// }));





// passport.serializeUser((user, done) => {
//   console.log('Serializing user:', user.id);
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   console.log('Deserializing user:', id);
//   try {
//     const user = await User.findById(id);
//     console.log('User deserialized:', user);
//     done(null, user);
//   } catch (error) {
//     console.error('Error retrieving user during deserialization:', error);
//     done(error, null);
//   }
// });

// // Google OAuth routes
// app.get('/auth/google', (req, res, next) => {
//   console.log('Initiating Google OAuth authentication');
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login-failed' }),
//   (req, res) => {
//     console.log('Google OAuth callback received');
//     req.session.user = req.user; // Example: Saving user to session
//     console.log('User authenticated:', req.user);
//     res.redirect('http://localhost:3000'); // Redirect to the user page
//   }
// );

// // Failure route for debugging
// app.get('/login-failed', (req, res) => {
//   console.log('Google OAuth authentication failed.');
//   res.send('Google OAuth authentication failed.');
// });

// // Endpoint to get user data
// app.get('/api/user', (req, res) => {
//   if (req.isAuthenticated()) {
//   //  console.log('User data being sent to frontend:', req.user);
//     res.json({
//       name: req.user.displayName || req.user.email,
//       picture: req.user.picture || 'default-avatar-url',
//       email: req.user.email,
//       googleId: req.user.googleId
//     });
//   } else {
//     res.status(401).json({ error: 'User not authenticated' });
//   }
// });

// // Add this route to handle logout
// app.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error('Error logging out:', err);
//       return res.status(500).send('Could not log out.');
//     }
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Error destroying session:', err);
//         return res.status(500).send('Could not log out.');
//       }
//       res.clearCookie('connect.sid'); // Clear the session cookie
//       res.redirect('http://localhost:3000'); // Redirect to the homepage or login page
//     });
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
const promptRoutes = require('./routes/promptRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const app = express();

// CORS setup with credentials
app.use(cors({
  origin: 'https://happy-f-lime.vercel.app',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // For parsing application/json

// Google OAuth endpoint
app.get('/auth/google', (req, res) => {
  const redirect_uri = encodeURIComponent('https://happys-i6rs.onrender.com/auth/google/callback');
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent('profile email');
  const response_type = 'code';
  const google_auth_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;

  res.redirect(google_auth_url);
});

// Google OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  const redirect_uri = 'https://happys-i6rs.onrender.com/auth/google/callback';
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;

  try {
    // Exchange the code for an access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code'
    });

    const accessToken = tokenResponse.data.access_token;

    // Retrieve user information
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { id, email, name, picture } = userResponse.data;

    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        email: email,
        displayName: name,
        picture: picture,
        tokensUsed: 0
      });
      await user.save();
      console.log('New user created:', user);
    } else {
      console.log('User exists:', user);
    }

    // Generate JWT
    const tokenPayload = { id: user.id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '14d' });

    // Redirect to frontend with the token
    res.redirect(`https://happy-f-lime.vercel.app/?token=${token}`);
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.redirect('/login-failed');
  }
});

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token is not valid' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Token is missing' });
  }
};

// Protect your API routes with the authenticateJWT middleware
app.use('/api', authenticateJWT, promptRoutes);
app.use('/api', authenticateJWT, userRoutes);

// Endpoint to get user data
app.get('/api/user', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        name: user.displayName || user.email,
        picture: user.picture || 'default-avatar-url',
        email: user.email,
        googleId: user.googleId
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout route (handled on frontend by removing token)
app.get('/logout', (req, res) => {
  // No need to handle anything on the backend
  res.redirect('http://localhost:3000'); // Redirect to the homepage or login page
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
