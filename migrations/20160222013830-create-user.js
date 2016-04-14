'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
      .createTable(
        'User',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          email: {
            type: Sequelize.STRING
          },
          firstName: {
            type: Sequelize.STRING
          },
          lastName: {
            type: Sequelize.STRING
          },
          username: {
            type: Sequelize.STRING
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

    return queryInterface.dropTable('User');

  }
};
