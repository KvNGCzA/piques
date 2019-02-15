/* eslint-disable */
export default (sequelize, DataTypes) => {
  const OrganizationType = sequelize.define('OrganizationType', {
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  OrganizationType.associate = (models) => {
    const { Organization, Type } = models;

    OrganizationType.belongsTo(Organization, {
      foreignKey: 'organizationId'
    });

    OrganizationType.belongsTo(Type, {
      foreignKey: 'typeId'
    });
  };
  return OrganizationType;
};
