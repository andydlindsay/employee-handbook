'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
      .createTable(
        'UserRole',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'User',
              key: 'id'
            }
          },
          roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Role',
              key: 'id'
            }
          },
          active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        }
      );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.dropTable('UserRole');

  }
};
