const User = require('../models/User');

// Function to get the tokens used by the authenticated user
const getUserTokens = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Find the user by ID from the session
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the tokens used by the user
    res.status(200).json({ tokensUsed: user.tokensUsed });
  } catch (error) {
    console.error('Server error while fetching user tokens:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUserTokens };
