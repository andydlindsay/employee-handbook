'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'User',[
        {
          id: 1,
          firstName: 'Andy',
          lastName: 'Lindsay'
        },{
          id: 2,
          firstName: 'Tony',
          lastName: 'Eldorado'
        },{
          id: 3,
          firstName: 'Christina',
          lastName: 'Odd'
        }  
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'User', [
        {
          id: 1
        },{
          id: 2
        },{
          id: 3
        }  
      ]  
    );

  }
};
