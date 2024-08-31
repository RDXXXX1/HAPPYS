

// const express = require('express');
// const router = express.Router();
// const {
//   getAllPrompts,
//   getPromptById,
//   savePrompt,
//   updatePrompt,
//   executePrompt,
//   getUserPrompts,
//   deletePromptById
// } = require('../controller/promptController');

// router.get('/prompts', getAllPrompts);
// router.get('/userprompts', getUserPrompts);
// router.get('/prompts/:id', getPromptById);
// router.post('/prompts', savePrompt);
// router.put('/prompts/:id', updatePrompt); // Added endpoint for updating prompts
// router.post('/prompts/:id/execute', executePrompt);
// router.delete('/prompts/:id', deletePromptById);


// module.exports = router;




const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); // Import the authentication middleware
const {
  getAllPrompts,
  getPromptById,
  savePrompt,
  updatePrompt,
  executePrompt,
  getUserPrompts,
  deletePromptById
} = require('../controller/promptController');

// Apply the middleware to protect these routes
router.get('/userprompts', getUserPrompts);
router.get('/prompts/:id', ensureAuthenticated, getPromptById);
router.post('/prompts/:id/execute', ensureAuthenticated, executePrompt);


module.exports = router;