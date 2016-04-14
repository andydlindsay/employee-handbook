'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert(
      'Category',[{
          id: 1,
          title: "BusinessVision (BV)",
          desc: "The most useful program in the world. You will be well served to study this manual cover to cover.",
          order: 1
        },{
          id: 2,
          title: "BusinessVision Essentials (BVE)",
          desc: "The successor to classic BusinessVision.",
          order: 3
        },{
          id: 3,
          title: "Occupational Health & Safety (OH&S)",
          desc: "Instructions and directions on how to work safely.",
          order: 2
        }
      ]
    );
    
  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete(
      'Category',[{
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
