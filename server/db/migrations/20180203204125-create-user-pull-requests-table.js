'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('UserPullRequests', {
        UserID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        PullRequestID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'PullRequests',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addConstraint('UserPullRequests', ['UserID', 'PullRequestID'], {
          type: 'primary key',
          name: 'UserPullRequests_pkey'
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPullRequests');
  }
};
