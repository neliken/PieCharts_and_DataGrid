'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      transaction_date: {
        type: Sequelize.DATE
      },
      debit_amount: {
        type: Sequelize.NUMERIC(6,2)
      },
      credit_amount: {
        type: Sequelize.NUMERIC(6,2)
      },
      sender: {
        type: Sequelize.STRING(100)
      },
      receiver: {
        type: Sequelize.STRING(100)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};