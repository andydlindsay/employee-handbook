'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      'Version', [
      {
        id: 14,
        number: '1.0',
        effectiveDate: '2014-10-27 01:00:00',
        reviewDate: '2015-10-27 01:00:00',
        approved: true,
        active: false,
        procedureId: 1,
        userId: 1,
        approvalId: 3
      },{
        id: 15,
        number: '2.0',
        effectiveDate: '2015-10-27 01:00:00',
        reviewDate: '2016-10-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 1,
        userId: 2,
        approvalId: 3
      },{
        id: 16,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 2,
        userId: 1,
        approvalId: 3
      },{
        id: 17,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 3,
        userId: 2,
        approvalId: 3
      },{
        id: 18,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 4,
        userId: 2,
        approvalId: 3
      },{
        id: 19,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 5,
        userId: 2,
        approvalId: 3
      },{
        id: 20,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 6,
        userId: 2,
        approvalId: 3
      },{
        id: 21,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 7,
        userId: 1,
        approvalId: 3
      },{
        id: 22,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 8,
        userId: 1,
        approvalId: 3
      },{
        id: 23,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 9,
        userId: 1,
        approvalId: 3
      },{
        id: 24,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 10,
        userId: 2,
        approvalId: 3
      },{
        id: 25,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 11,
        userId: 2,
        approvalId: 3
      },{
        id: 26,
        number: '1.0',
        effectiveDate: '2015-08-27 01:00:00',
        reviewDate: '2016-08-27 01:00:00',
        approved: true,
        active: true,
        procedureId: 12,
        userId: 2,
        approvalId: 3
      }
      ]  
    );

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete(
      'Version', [
        { id: 14 },{ id: 15 },{ id: 16 },{ id: 17 },
        { id: 18 },{ id: 19 },{ id: 20 },{ id: 21 },
        { id: 22 },{ id: 23 },{ id: 24 },{ id: 25 },
        { id: 26}
      ]  
    );

  }
};
