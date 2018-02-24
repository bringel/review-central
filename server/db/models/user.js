'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    githubUsername: DataTypes.STRING,
    githubName: DataTypes.STRING,
    githubID: DataTypes.BIGINT,
    githubEmail: DataTypes.STRING
  });

  User.associate = function(models) {
    User.belongsToMany(models.PullRequest, { through: 'UserPullRequests', foreignKey: 'userID' });
  };
  return User;
};
