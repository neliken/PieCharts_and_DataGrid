'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', 
    [
      {
        transaction_date: new Date('2022-07-04'),
        credit_amount: 300,
        debit_amount:  733,
        sender: 'Brigitte Conws',
        receiver: 'Stephana Teeney'
      },
      {
        transaction_date: new Date('2022-05-21'),
        credit_amount: 637,
        debit_amount:  148,
        sender: 'Abigale Hurlin',
        receiver: 'Spenser Relf'
      },
      {
        transaction_date: new Date('2022-07-14'),
        credit_amount: 341,
        debit_amount:  167,
        sender: 'Sylas McGonigal',
        receiver: 'Ariella Downse'
      },
      {
        transaction_date: new Date('2022-07-14'),
        credit_amount: 343,
        debit_amount:  817,
        sender: 'Tatiania Rainton',
        receiver: 'Cate MacDuffie'
      },
      {
        transaction_date: new Date('2022-05-29'),
        credit_amount: 883,
        debit_amount:  340,
        sender: 'Marlin Coultard',
        receiver: 'Trent Carmichael'
      },
      {
        transaction_date: new Date('2022-05-29'),
        credit_amount: 375,
        debit_amount:  976,
        sender: 'Dell Jentges',
        receiver: 'Jillene Dreus'
      },
      {
        transaction_date: new Date('2022-01-07'),
        credit_amount: 341,
        debit_amount:  167,
        sender: 'Gun Wolfe',
        receiver: 'Miltie Ryson'
      },
      {
        transaction_date: new Date('2022-07-14'),
        credit_amount: 343,
        debit_amount:  817,
        sender: 'Catarina Langabeer',
        receiver: 'Kaiser Tredgold'
      },
      {
        transaction_date: new Date('2022-06-13'),
        credit_amount: 883,
        debit_amount:  340,
        sender: 'Reeta Gronaller',
        receiver: 'Mateo Sampey'
      },
      {
        transaction_date: new Date('2022-10-01'),
        credit_amount: 375,
        debit_amount:  976,
        sender: 'Angelita Baskerville',
        receiver: 'Kaiser Tredgold'
      },
    ], 
    {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
