'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'Procedure',[{
          id: 1,
          sectionId: 1,
          title: "Add a New Customer",
          desc: "Adding new customers.",
          order: 1
        },{
          id: 2,
          sectionId: 1,
          title: "Update the Customer's Billing Address",
          desc: "Proper billing information is critical.",
          order: 2
        },{
          id: 3,
          sectionId: 2,
          title: "Enter a New Sales Order",
          desc: "Entering sales orders.",
          order: 1
        },{
          id: 4,
          sectionId: 2,
          title: "Apply a Deposit to a Sales Order",
          desc: "How to apply a deposit.",
          order: 2
        },{
          id: 5,
          sectionId: 3,
          title: "Creating a New Purchase Order",
          desc: "How to create a purchase order.",
          order: 1
        },{
          id: 6,
          sectionId: 3,
          title: "Purchase Order Status",
          desc: "Adding and changing statuses.",
          order: 2
        },{
          id: 7,
          sectionId: 4,
          title: "Writing Off Inventory",
          desc: "How to write on or off inventory.",
          order: 1
        },{
          id: 8,
          sectionId: 4,
          title: "Inventory Counts",
          desc: "How to perform an inventory count.",
          order: 2
        },{
          id: 9,
          sectionId: 5,
          title: "Forms",
          desc: "Which forms must a new employee fill out?",
          order: 1
        },{
          id: 10,
          sectionId: 5,
          title: "Discipline Process",
          desc: "How are employees disciplined?",
          order: 2
        },{
          id: 11,
          sectionId: 6,
          title: "Fire Evacuation Plan",
          desc: "Escaping from the building in the event of a fire.",
          order: 1
        },{
          id: 12,
          sectionId: 6,
          title: "OH&S Committee Contacts",
          desc: "Who is on your OH&S Committee?",
          order: 2
        }
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'Procedure',[
        { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },
        { id: 5 },{ id: 6 },{ id: 7 },{ id: 8 },
        { id: 9 },{ id: 10 },{ id: 11 },{ id: 12 }
      ]
    );

  }
};
