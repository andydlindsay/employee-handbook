'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'Instruction', [
        {
          id: 7,
          versionId: 14,
          order: 1,
          instruction: 'Open the Customer\'s Module from the column on the left. The symbol is a small head.',
          image: 'http://tri-tech.com/uploads/pages/BVEssentials_sales_tax_update.png',
          imageCaption: 'Customer\'s Module',
          video: 'https://youtu.be/ziD7nUWC680'
        },{
          id: 8,
          versionId: 14,
          order: 3,
          instruction: 'Choose \'Add New\' from the buttons along the top of the screen.',
          image: 'https://i.ytimg.com/vi/r1Mhsb82YR8/maxresdefault.jpg',
          imageCaption: 'Add New'
        },{
          id: 9,
          versionId: 14,
          order: 2,
          instruction: 'Enter the customer\'s information into the appropriate fields. Make sure that contact information is added for the customer\'s Accounts Payable department.',
          image: 'https://i.ytimg.com/vi/41OjdvBX1ME/maxresdefault.jpg',
          imageCaption: 'Customer Information'
        },{
          id: 10,
          versionId: 15,
          order: 1,
          instruction: 'Choose File -> Edit -> Add New Customer.',
          image: 'https://i.ytimg.com/vi/iddqkeyKkpY/maxresdefault.jpg',
          imageCaption: 'File System'
        },{
          id: 11,
          versionId: 15,
          order: 2,
          instruction: 'Enter the customer\'s information into the appropriate fields.'
        },{
          id: 12,
          versionId: 16,
          order: 1,
          instruction: 'Writing off inventory is a delicate process and should only be attempted by professionals. Undo inventory degredation can occur if you are not careful.',
          image: 'https://i.ytimg.com/vi/tQXhZXx_S18/maxresdefault.jpg',
          imageCaption: 'Writing Off Inventory',
          video: 'https://youtu.be/VNrXBwwLpAY'
        },{
          id: 13,
          versionId: 16,
          order: 2,
          instruction: 'Enter the customer\'s information into the appropriate fields. Make sure that contact information is added for the customer\'s Accounts Payable department.',
          image: 'https://i.ytimg.com/vi/41OjdvBX1ME/maxresdefault.jpg',
          imageCaption: 'Customer Information'
        }  
      ]  
    );  

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'Instruction', [
        { id: 7 },{ id: 8 },{ id: 9 },{ id: 10 },
        { id: 11 },{ id: 12 }
      ]  
    );

  }
};
