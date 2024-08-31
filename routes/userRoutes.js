const express=require('express');
const router=express.Router();

const {getUserTokens}=require('../controller/userController');

router.get('/user/tokens', getUserTokens);

module.exports = router;
