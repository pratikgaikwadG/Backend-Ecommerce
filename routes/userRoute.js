
//http://localhost:5000/api/auth/register
//http://localhost:5000/api/auth/login
// http:localhost:5001/api/users/userinfo

const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/auth'); // Import the auth middleware

const router = express.Router();

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

// Protected route - requires authentication
router.get('/userinfo', auth, userController.userinfo);

module.exports = router;
