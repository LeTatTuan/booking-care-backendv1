'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456', // plain text, hash password
      firstName: 'Le Tat',
      lastName: 'Tuan',
      address: 'Quang Tri',
      gender: 1,
      image: 'letattuan',
      roleId: 'ROLE',
      phoneNumber: '0342047996',
      positionId: 'T1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
