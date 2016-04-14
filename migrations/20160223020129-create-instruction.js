'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface
      .createTable(
        'Instruction',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          versionId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Version',
              key: 'id'
            }
          },
          order: {
            type: Sequelize.INTEGER
          },
          instruction: {
            type: Sequelize.TEXT
          },
          image: {
            type: Sequelize.STRING
          },
          imageCaption: {
            type: Sequelize.STRING
          },
          video: {
            type: Sequelize.STRING
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

    return queryInterface.dropTable('Instruction');

  }
};
