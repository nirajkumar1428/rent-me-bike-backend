const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },

    });
    User.generateAuthToken = (userDetail) => {
      const token = jwt.sign({
        id: userDetail.id,
        name: userDetail.name,
        email: userDetail.email,
      },
      'rentmebike');
      return token;
    };
    User.validate = (userData) => {
      const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        name: Joi.string(),
        number: Joi.number().integer().min(10).required(),
        password: Joi.string().alphanum().min(5).max(255).required(),
      };
      return Joi.validate(userData, schema, { abortEarly: false });
    };
  
    return User;
}