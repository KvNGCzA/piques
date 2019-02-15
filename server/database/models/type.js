/* eslint-disable */
export default (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  Type.associate = (models) => {
    const { OrganizationType } = models;

    Type.hasMany(OrganizationType, {
      foreignKey: 'typeId'
    })
  };
  return Type;
};
