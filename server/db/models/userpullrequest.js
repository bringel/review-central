'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPullRequest = sequelize.define('UserPullRequest', {
    userID: DataTypes.INTEGER,
    pullRequestID: DataTypes.INTEGER,
    status: DataTypes.STRING
  });

  return UserPullRequest;
};
