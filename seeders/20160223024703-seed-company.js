'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'Company', [
        {
          id: 1,
          name: 'Pacific Restaurant Supply',
          shortName: 'Pacific',
          slogan: 'Staying mean and green for the long haul.',
          about: 'Insert about information here.',
          logo: 'http://pacificrestaurantsupply.com/workspace/assets/img/logo.png',
          vision: 'We have a vision.',
          mission: 'We have a mission.',
          value: 'We have values.',
          letter: 'Insert President\'s Letter here.'
        }  
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'Company', [
        { id: 1 }
      ]  
    );

  }
};
