'use strict';
module.exports = (sequelize, DataTypes) => {
  var PullRequest = sequelize.define('PullRequest', {
    githubID: DataTypes.BIGINT,
    number: DataTypes.BIGINT,
    title: DataTypes.STRING,
    developerID: DataTypes.BIGINT,
    pullRequestCreatedDatetime: DataTypes.DATE,
    pullRequestUpdatedDatetime: DataTypes.DATE,
    branchName: DataTypes.STRING,
    status: DataTypes.STRING,
    jiraIssueKey: DataTypes.STRING
  });

  PullRequest.associate = function(models) {
    PullRequest.belongsToMany(models.User, { through: 'UserPullRequests', foreignKey: 'pullRequestID' });
  };
  return PullRequest;
};
