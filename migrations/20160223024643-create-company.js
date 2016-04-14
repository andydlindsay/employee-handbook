'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
      .createTable(
        'Company',
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
          shortName: {
            type: Sequelize.STRING
          },
          slogan: {
            type: Sequelize.STRING
          },
          about: {
            type: Sequelize.TEXT
          },
          logo: {
            type: Sequelize.STRING
          },
          vision: {
            type: Sequelize.TEXT
          },
          mission: {
            type: Sequelize.TEXT
          },
          value: {
            type: Sequelize.TEXT
          },
          letter: {
            type: Sequelize.TEXT
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

    return queryInterface.dropTable('Company');

  }
};
