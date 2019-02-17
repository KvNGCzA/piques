/* eslint-disable */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    avatarUrl: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'false'
    },
    verified: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    follows: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Users')
};
