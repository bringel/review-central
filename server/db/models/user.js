'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    githubUsername: DataTypes.STRING,
    githubName: DataTypes.STRING,
    githubID: DataTypes.INTEGER,
    githubEmail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};