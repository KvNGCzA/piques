export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    firstName: 'John',
    lastName: 'Doe',
    password: '123456789',
    email: 'johndoe@yahoo.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
