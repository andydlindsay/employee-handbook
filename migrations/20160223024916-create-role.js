'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
      .createTable(
        'Role',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING
          },
          desc: {
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

    return queryInterface.dropTable('Role');

  }
};
