'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('UserPullRequests', {
        userID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        pullRequestID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'PullRequests',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        status: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addConstraint('UserPullRequests', ['userID', 'pullRequestID'], {
          type: 'primary key',
          name: 'UserPullRequests_pkey'
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPullRequests');
  }
};
