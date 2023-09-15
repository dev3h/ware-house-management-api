"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      document_import: {
        type: Sequelize.DATE,
      },
      document_export: {
        type: Sequelize.DATE,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        required: true,
      },
      total_price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "companies" },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "departments" },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "suppliers" },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Documents");
  },
};