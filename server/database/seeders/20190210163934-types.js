export default {
  up: queryInterface => queryInterface.bulkInsert('Types', [{
    name: 'Examination Body',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Tertiary Institution',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'High School',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Primary School',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Types', null, {})
};
