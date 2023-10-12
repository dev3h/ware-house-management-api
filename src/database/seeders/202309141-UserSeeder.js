"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const users = [...Array(20)].map((item) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      }));
      await queryInterface.bulkInsert("users", users, {});
    } catch (error) {
      console.error("Error seeding user:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("users", null, {});
    } catch (error) {
      console.error("Error undoing user seed:", error);
    }
  },
};
