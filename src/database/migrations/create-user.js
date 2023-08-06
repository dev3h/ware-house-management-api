"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: { tableName: "companies" },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      department_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: { tableName: "departments" },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      address: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        comment: "0: inactive, 1: active",
        defaultValue: 1,
      },
      is_group: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      password_changed_at: {
        type: Sequelize.DATE,
      },
      password_reset_token: {
        type: Sequelize.STRING,
      },
      password_reset_token_expired_at: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
