/* eslint-disable */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Organizations', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contactEmail: {
      type: Sequelize.STRING
    },
    contactNumber: {
      type: Sequelize.INTEGER
    },
    country: {
      type: Sequelize.STRING
    },
    avatarUrl: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'false'
    },
    verified: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    followers: {
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
  down: queryInterface => queryInterface.dropTable('Organizations')
};
