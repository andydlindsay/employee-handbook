'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Version',
      'active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: null
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Version',
      'active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    );
  }
};
