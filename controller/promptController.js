
// require('dotenv').config();
// const Prompt = require('../models/promptModel');
// const { OpenAI } = require('openai');
// const APIKEY = process.env.OPENAI_API_KEY;
// const openai = new OpenAI({ apiKey: APIKEY });
// // Function to replace placeholders in the prompt template with actual values
// const fillPromptVariables = (promptTemplate, variables) => {
//   let filledPrompt = promptTemplate;

//   variables.forEach(variable => {
//     const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
//     filledPrompt = filledPrompt.replace(regex, variable.value || '');
//   });

//   return filledPrompt;
// };

// // Function to send the filled prompt to ChatGPT and get the response
// // const sendPromptToChatGPT = async (filledPrompt) => {
// //   try {
// //     const response = await openai.chat.completions.create({
// //       model: 'gpt-4',
// //       messages: [{ role: 'user', content: filledPrompt }],
// //       max_tokens: 150
// //     });
// //     return response.choices[0].message.content.trim();
// //   } catch (error) {
// //     throw new Error('Failed to get response from ChatGPT');
// //   }
// // };

// // const sendPromptToChatGPT = async (filledPrompt) => {
// //   try {
// //     const response = await openai.chat.completions.create({
// //       model: 'gpt-4',
// //       messages: [{ role: 'user', content: filledPrompt }],
// //       max_tokens: 400
// //     });
// //     console.log(response);
// //     return response.choices[0].message.content.trim();

// //   } catch (error) {
// //     throw new Error('Failed to get response from ChatGPT');
// //   }
// // };




// // const sendPromptToChatGPT = async (filledPrompt) => {
// //   try {
// //     const response = await openai.chat.completions.create({
// //       model: 'gpt-4',
// //       messages: [{ role: 'user', content: filledPrompt }],
// //       max_tokens: 400
// //     });
    
// //     // Extract token usage information
 
// //     const totalTokens = response.usage.total_tokens; // Total tokens used

// //     console.log(response);

// //     // Return the response and token usage information
// //     return {
// //       content: response.choices[0].message.content.trim(),
// //       totalTokens
// //     };

// //   } catch (error) {
// //     throw new Error('Failed to get response from ChatGPT');
// //   }
// // };


// const sendPromptToChatGPT = async (filledPrompt, userId) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [{ role: 'user', content: filledPrompt }],
//       max_tokens: 400
//     });
    
//     const totalTokens = response.usage.total_tokens;

//     // Update the user's tokensUsed
//     await User.findByIdAndUpdate(userId, { $inc: { tokensUsed: totalTokens } });

//     console.log(response);

//     return {
//       content: response.choices[0].message.content.trim(),
//       totalTokens
//     };

//   } catch (error) {
//     throw new Error('Failed to get response from ChatGPT');
//   }
// };


// // Get all prompts from the database
// const getAllPrompts = async (req, res) => {
//   try {
//     const prompts = await Prompt.find();
//     console.log(prompts);
//     res.status(200).json(prompts);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Get all prompts with visibility set to true from the database for user

// const getUserPrompts = async (req, res) => {
//   try {
//     const visiblePrompts = await Prompt.find({ visibility: true });
//     // console.log(visiblePrompts);
//     res.status(200).json(visiblePrompts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Get a single prompt by ID from the database
// const getPromptById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const prompt = await Prompt.findById(id);
//     if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
//     res.status(200).json(prompt);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const deletePromptById = async (req,res) =>{
//   try{
//     const {id}=req.params;
//     const prompt=await Prompt.findById(id);
//     if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
//     await Prompt.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Prompt deleted successfully' });
//   } catch (error){
//     res.status(500).json({message:'Server error'});
//   }
// };

// // Save a new prompt to the database
// const savePrompt = async (req, res) => {
//   try {
//     const { title, prompt, variables, description, visibility } = req.body;
//     if (!title || !prompt || !Array.isArray(variables)) {
//       return res.status(400).json({ message: 'Invalid input' });
//     }

//     const formattedPrompt = variables.reduce((acc, variable) => {
//       const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
//       // Check if the variable is already wrapped in brackets
//       if (!acc.includes(`[${variable.name}]`)) {
//         acc += ` [${variable.name}]`;
//       }
//       return acc;
//     }, prompt);

//     const newPrompt = new Prompt({ 
//       title, 
//       prompt: formattedPrompt, 
//       description, 
//       variables,
//       visibility 
//     });
//     await newPrompt.save();
//     res.status(201).json({ message: 'Prompt saved successfully', prompt: newPrompt });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update an existing prompt by ID
// const updatePrompt = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, prompt, variables, description, visibility } = req.body;
//     if (!title || !prompt || !Array.isArray(variables)) {
//       return res.status(400).json({ message: 'Invalid input' });
//     }

//     const formattedPrompt = variables.reduce((acc, variable) => {
//       const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
//       // Check if the variable is already wrapped in brackets
//       if (!acc.includes(`[${variable.name}]`)) {
//         acc += ` [${variable.name}]`;
//       }
//       return acc;
//     }, prompt);

//     const updatedPrompt = await Prompt.findByIdAndUpdate(
//       id,
//       { 
//         title, 
//         prompt: formattedPrompt, 
//         description, 
//         variables,
//         visibility 
//       },
//       { new: true, runValidators: true }
//     );
//     if (!updatedPrompt) return res.status(404).json({ message: 'Prompt not found' });
//     res.status(200).json({ message: 'Prompt updated successfully', prompt: updatedPrompt });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Execute a prompt by ID with given variables
// // const executePrompt = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { variables } = req.body;

// //     const prompt = await Prompt.findById(id);
// //     if (!prompt) {
// //       return res.status(404).json({ message: 'Prompt not found' });
// //     }

// //     const filledPrompt = fillPromptVariables(prompt.prompt, variables);
// //     const chatGPTResponse = await sendPromptToChatGPT(filledPrompt);

// //     res.status(200).json({ response: chatGPTResponse });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };



// const executePrompt = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { variables } = req.body;

//     const prompt = await Prompt.findById(id);
//     if (!prompt) {
//       return res.status(404).json({ message: 'Prompt not found' });
//     }

//     const filledPrompt = fillPromptVariables(prompt.prompt, variables);
//     const chatGPTResponse = await sendPromptToChatGPT(filledPrompt, req.user._id);

//     res.status(200).json({ response: chatGPTResponse });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// module.exports = { getAllPrompts, getPromptById, savePrompt, updatePrompt, executePrompt , getUserPrompts ,deletePromptById};



require('dotenv').config();
const Prompt = require('../models/promptModel');
const User = require('../models/User');  // Ensure the User model is imported
const { OpenAI } = require('openai');
const APIKEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: APIKEY });

// Function to replace placeholders in the prompt template with actual values
const fillPromptVariables = (promptTemplate, variables) => {
  console.log('Filling prompt variables:', { promptTemplate, variables });
  let filledPrompt = promptTemplate;

  variables.forEach(variable => {
    const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
    filledPrompt = filledPrompt.replace(regex, variable.value || '');
  });

  console.log('Filled prompt:', filledPrompt);
  return filledPrompt;
};

// Function to send the filled prompt to ChatGPT and get the response
const sendPromptToChatGPT = async (filledPrompt, userId) => {
  try {
    console.log('Sending prompt to ChatGPT:', filledPrompt);
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: filledPrompt }],
      max_tokens: 400
    });
    
    const totalTokens = response.usage.total_tokens;

    // Update the user's tokensUsed
    console.log(`Updating tokens for user ${userId}: ${totalTokens} tokens used.`);
    await User.findByIdAndUpdate(userId, { $inc: { tokensUsed: totalTokens } });

    console.log('ChatGPT response:', response);

    return {
      content: response.choices[0].message.content.trim(),
      totalTokens
    };

  } catch (error) {
    console.error('Failed to get response from ChatGPT:', error);
    throw new Error('Failed to get response from ChatGPT');
  }
};

// Get all prompts from the database
const getAllPrompts = async (req, res) => {
  try {
    console.log('Fetching all prompts from database.');
    const prompts = await Prompt.find();
    console.log('Fetched prompts:', prompts);
    res.status(200).json(prompts);
  } catch (error) {
    console.error('Server error while fetching all prompts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all prompts with visibility set to true from the database for user
const getUserPrompts = async (req, res) => {
  try {
    console.log('Fetching visible prompts for user.');
    const visiblePrompts = await Prompt.find({ visibility: true });
    console.log('Fetched visible prompts:', visiblePrompts);
    res.status(200).json(visiblePrompts);
  } catch (error) {
    console.error('Server error while fetching visible prompts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single prompt by ID from the database
const getPromptById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching prompt by ID: ${id}`);
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      console.log('Prompt not found');
      return res.status(404).json({ message: 'Prompt not found' });
    }
    console.log('Fetched prompt:', prompt);
    res.status(200).json(prompt);
  } catch (error) {
    console.error('Server error while fetching prompt by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a prompt by ID from the database
const deletePromptById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting prompt by ID: ${id}`);
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      console.log('Prompt not found');
      return res.status(404).json({ message: 'Prompt not found' });
    }
    await Prompt.findByIdAndDelete(id);
    console.log('Prompt deleted successfully');
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    console.error('Server error while deleting prompt by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a new prompt to the database
const savePrompt = async (req, res) => {
  try {
    const { title, prompt, variables, description, visibility } = req.body;
    console.log('Saving new prompt:', { title, prompt, variables, description, visibility });
    if (!title || !prompt || !Array.isArray(variables)) {
      console.log('Invalid input');
      return res.status(400).json({ message: 'Invalid input' });
    }

    const formattedPrompt = variables.reduce((acc, variable) => {
      const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
      if (!acc.includes(`[${variable.name}]`)) {
        acc += ` [${variable.name}]`;
      }
      return acc;
    }, prompt);

    const newPrompt = new Prompt({ 
      title, 
      prompt: formattedPrompt, 
      description, 
      variables,
      visibility 
    });

    await newPrompt.save();
    console.log('Prompt saved successfully:', newPrompt);
    res.status(201).json({ message: 'Prompt saved successfully', prompt: newPrompt });
  } catch (error) {
    console.error('Server error while saving prompt:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing prompt by ID
const updatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, prompt, variables, description, visibility } = req.body;
    console.log(`Updating prompt by ID: ${id}`, { title, prompt, variables, description, visibility });
    if (!title || !prompt || !Array.isArray(variables)) {
      console.log('Invalid input');
      return res.status(400).json({ message: 'Invalid input' });
    }

    const formattedPrompt = variables.reduce((acc, variable) => {
      const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
      if (!acc.includes(`[${variable.name}]`)) {
        acc += ` [${variable.name}]`;
      }
      return acc;
    }, prompt);

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      { 
        title, 
        prompt: formattedPrompt, 
        description, 
        variables,
        visibility 
      },
      { new: true, runValidators: true }
    );
    if (!updatedPrompt) {
      console.log('Prompt not found');
      return res.status(404).json({ message: 'Prompt not found' });
    }
    console.log('Prompt updated successfully:', updatedPrompt);
    res.status(200).json({ message: 'Prompt updated successfully', prompt: updatedPrompt });
  } catch (error) {
    console.error('Server error while updating prompt:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Execute a prompt by ID with given variables
const executePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { variables } = req.body;
    console.log(`Executing prompt by ID: ${id} with variables:`, variables);

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      console.log('Prompt not found');
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const filledPrompt = fillPromptVariables(prompt.prompt, variables);
    const chatGPTResponse = await sendPromptToChatGPT(filledPrompt, req.user._id);

    console.log('ChatGPT response:', chatGPTResponse);
    res.status(200).json({ response: chatGPTResponse });
  } catch (error) {
    console.error('Server error while executing prompt:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllPrompts, getPromptById, savePrompt, updatePrompt, executePrompt, getUserPrompts, deletePromptById };
