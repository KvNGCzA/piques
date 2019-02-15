/* eslint-disable */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrganizationTypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    organizationId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Organizations',
        key: 'id'
      }
    },
    typeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Types',
        key: 'id'
      }
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
  down: (queryInterface) =>  queryInterface.dropTable('OrganizationTypes')
};
