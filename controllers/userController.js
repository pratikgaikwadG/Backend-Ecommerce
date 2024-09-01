
// const jwt = require('jsonwebtoken');

// const User = require('../models/user'); // Adjust the path based on your project structure
// const auth = require('../middlewares/auth');

// async function registerUser(req, res) {
//     console.log(req.body);
//     const { name, email, password, mobileNumber, role } = req.body;
//     try {
//         const existUser = await User.findOne({ email });
//         console.log(existUser);
//         if (!existUser) {
//             const user = new User({ name, email, password, mobileNumber, role });
//             await user.save();
//             res.status(201).send({ message: 'User registered successfully', success: true });
//         } else {
//             res.status(200).send({ message: 'User already exists.', success: false });
//         }
//     } catch (err) {
//         res.status(400).send({ error: err.message });
//     }
// };

// module.exports = { registerUser };

// async function login(req, res) {
//     console.log(req.body);
//     try {
//       const  { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user || !(await user.comparePassword(password))) {
//         return res.status(400).send({ error: "Invalid Email or Password" });
//       }
//       const token = jwt.sign({ _id: user._id, role: user.role }, "key", {
//         expiresIn: "1h",
//       });
//       res.status(200).send({ user: user, access: token, success: true });
//     } catch (error) {
//       res.status(500).send({
//         message: error.message,
//       });
//     }
//   }

// async function userinfo(req, res) {
//   console.log("**** User info:", req.user);
//   const user = req.user._id;  

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).send({ msg: "User not found", success: false });
//     }
//     res.status(202).send({ user: user, success: true });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// }

// module.exports = {
//   registerUser,
//   login,
//   userinfo,
// };

const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path based on your project structure

async function registerUser(req, res) {
    const { name, email, password, mobileNumber, role } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            const user = new User({ name, email, password, mobileNumber, role });
            await user.save();
            res.status(201).send({ message: 'User registered successfully', success: true });
        } else {
            res.status(200).send({ message: 'User already exists.', success: false });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: "Invalid Email or Password" });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, "key", {
            expiresIn: "1h",
        });
        res.status(200).send({ user: user, access: token, success: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function userinfo(req, res) {
    const userId = req.user._id;  // Use req.user._id to get the user ID

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found", success: false });
        }
        res.status(200).send({ user: user, success: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    registerUser,
    login,
    userinfo,
};
