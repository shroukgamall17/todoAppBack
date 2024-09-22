const express= require('express');
const router =express.Router();
const {getAllUsers,createUser,login}= require('../controllers/users')
const {auth} = require('../middleware/auth');

router.get('/',getAllUsers)
router.post('/',createUser)
router.post('/login',login)



module.exports=router;
