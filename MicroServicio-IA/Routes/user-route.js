const {Router} =require('express');
const {createUser,login} = require('../Controllers/UserController');
const route = Router();


route.post('/register',createUser);
route.post('/login',login);



module.exports = route;