'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'Role', [
        {
          id: 1,
          name: 'Admin',
          desc: 'This user has the ability to approve pending procedures and add categories and sections to the handbook.'
        },{
          id: 2,
          name: 'Editor',
          desc: 'This user has the ability to create new procedures and new versions of existing procedures.'
        }  
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'Role', [
        { id: 1 }, { id: 2 }          
      ]  
    );

  }
};
