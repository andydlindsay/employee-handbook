'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface
        .createTable(
          'Procedure',
          {
            id: {
              allowNull: false,
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            sectionId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Section',
                key: 'id'
              }
            },
            title: {
              type: Sequelize.STRING
            },
            desc: {
              type: Sequelize.TEXT
            },
            order: {
              type: Sequelize.INTEGER
            },
            active: {
              type: Sequelize.BOOLEAN,
              defaultValue: true
            },
            createdAt: {
              defaultValue: Sequelize.NOW,
              type: Sequelize.DATE
            },
            updatedAt: {
              type: Sequelize.DATE
            }
          }
        );
        
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.dropTable('Procedure');
    
  }
};
