'use strict';
module.exports = (sequelize, DataTypes) => {
  var Repository = sequelize.define('Repository', {
    githubID: DataTypes.BIGINT,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  });

  Repository.associate = function(models) {
    Repository.hasMany(models.PullRequest);
  };
  return Repository;
};
