'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
      .createTable(
        'Version',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          procedureId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Procedure',
              key: 'id'
            }
          },
          number: {
            type: Sequelize.STRING
          },
          title: {
            type: Sequelize.STRING
          },
          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'User',
              key: 'id'
            }
          },
          effectiveDate: {
            type: Sequelize.DATE
          },
          reviewDate: {
            type: Sequelize.DATE
          },
          approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          approvalId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'User',
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

    return queryInterface.dropTable('Version');

  }
};
