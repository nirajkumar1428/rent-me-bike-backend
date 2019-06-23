"use strict";

module.exports = (sequelize, type) => {
  return sequelize.define('bike', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: type.STRING
  });
};