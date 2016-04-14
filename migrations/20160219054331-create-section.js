'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface
      .createTable(
        'Section',
        {
          id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          categoryId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Category',
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
          image: {
            type: Sequelize.STRING
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
   
    return queryInterface.dropTable('Section');
   
  }
};
