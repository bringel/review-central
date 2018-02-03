'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PullRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      githubID: {
        type: Sequelize.BIGINT
      },
      number: {
        type: Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING
      },
      developerID: {
        type: Sequelize.BIGINT
      },
      pullRequestCreatedDatetime: {
        type: Sequelize.DATE
      },
      pullRequestUpdatedDatetime: {
        type: Sequelize.DATE
      },
      branchName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      jiraIssueKey: {
        type: Sequelize.STRING
      },
      repositoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Repositories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PullRequests');
  }
};
