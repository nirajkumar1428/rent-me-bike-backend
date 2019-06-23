"use strict";

const bcrypt = require('bcrypt');

const express = require('express');

const {
  User,
  Bike
} = require('../config/db');

const router = express.Router();
router.post('/users', (req, res) => {
  const {
    error
  } = User.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    User.findAndCountAll({
      where: {
        email: req.body.email
      }
    }).then(result => {
      if (result.count === 0) {
        const salt = 10;
        bcrypt.hash(req.body.password, salt, function (err, hashPassword) {
          console.log('hashPassword', err, hashPassword);
          User.create({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            password: hashPassword
          }).then(user => res.json(user));
        });
      } else {
        return res.status(400).send('User already registered.');
      }
    });
  }
}); // get all users

router.get('/users', (req, res) => {
  User.findAll().then(users => res.json(users));
}); // router.post('/register', async (req, res) => {
//     const { error } = User.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (user) return res.status(400).send('User already registered.');
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);
//     const newUser = await User.create({
//       email: req.body.email,
//       password: hashPassword,
//     });
//     if (newUser) return res.send('User Create Sucessful');
//     return res.send('Server Error');
//   });
// router.post('/', async (req, res) => {
//   let requested = moment().format();
//   const error = User.validate(req.body);
//   if (error && error.error !== null) {
//     let unique = [];
//     let message = {};
//     error.error.details.forEach((element) => {
//       if (!(element.path in unique)) {
//         unique[element.path] = 1;
//         message[element.path[0]] = element.message;
//       }
//     });
//     res.status(422).json({ ...message });
//     res.end();
//     return false;
//   } 
//   const user = await User.findOne({ where: { email: req.body.email } });
//   if (!user) { 
//     return res.status(400).send({
//       status: 400,
//       email: 'Invalid username and password',
//     });
//   }
//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid hash');
//   const token = User.generateAuthToken(user);
//   return res.send({
//     status: 200,
//     message: 'Login Sucessful',
//     body: {
//       token,
//       userdetails: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     },
//     requested,
//     responded: moment().format(),
//     id: user.id,
//   });
// });

module.exports = router;