'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'UserRole', [
        {
          id: 1,
          userId: 1,
          roleId: 2
        }, {
          id: 2,
          userId: 2,
          roleId: 2
        }, {
          id: 3,
          userId: 3,
          roleId: 1
        }  
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'UserRole', [
        { id: 1 }, { id: 2 }, { id: 3 }  
      ]  
    );

  }
};
