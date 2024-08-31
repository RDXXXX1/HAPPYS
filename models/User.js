// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   googleId: { type: String, required: true, unique: true },
//   email: { type: String, unique: true, sparse: true }, 
//   displayName: { type: String }, 
//   picture: { type: String } 
// });

// module.exports = mongoose.model('User', UserSchema);



const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  displayName: { type: String },
  picture: { type: String },
  tokensUsed: { type: Number, default: 0 } // Add this field
});

module.exports = mongoose.model('User', UserSchema);
