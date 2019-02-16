/* eslint-disable */
export default (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Organization.associate = (models) => {
    const { OrganizationType } = models;

    Organization.hasMany(OrganizationType, {
      foreignKey: 'organizationId'
    })
  };
  return Organization;
};
