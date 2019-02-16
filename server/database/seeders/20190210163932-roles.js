export default {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    id: 18742,
    name: 'Super Admin',
    description: 'Can create and delete Admins',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9786,
    name: 'Admin',
    description: 'Can upload examinations',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 34521,
    name: 'Organization',
    description: 'Can upload organization examinations',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 98536,
    name: 'Student',
    description: 'Can take tests and exams',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
