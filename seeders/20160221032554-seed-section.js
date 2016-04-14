'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert(
      'Section',[{
          id: 1,
          categoryId: 1,
          title: "Customers",
          desc: "Customer management is critical to our future as a business.",
          order: 1
        },{
          id: 2,
          categoryId: 1,
          title: "Sales Orders",
          desc: "Sales are the cornerstone of our business.",
          order: 2
        },{
          id: 3,
          categoryId: 2,
          title: "Purchase Orders",
          desc: "Interactions with our vendors.",
          order: 1
        },{
          id: 4,
          categoryId: 2,
          title: "Inventory Adjustments",
          desc: "How to perform various inventory related tasks.",
          order: 2
        },{
          id: 5,
          categoryId: 3,
          title: "Employee Orientation",
          desc: "Onboarding employees.",
          order: 1
        },{
          id: 6,
          categoryId: 3,
          title: "OH&S Guidelines",
          desc: "Health and safety regulation guidelines.",
          order: 2
        }
      ]  
    );    
    
  },

  down: function (queryInterface, Sequelize) {
  
    return queryInterface.bulkDelete(
      'Section',[{ id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6 }]  
    );
  
  }
};
