'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'description',{
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('products', 'seller_id',{
      type: Sequelize.UUID,
      allowNull: false
    });
    await queryInterface.addColumn('products', 'price',{
      type: Sequelize.BIGINT,
      allowNull: false
    });
    await queryInterface.addColumn('products', 'tag_id',{
      type: Sequelize.UUID,
      allowNull: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};