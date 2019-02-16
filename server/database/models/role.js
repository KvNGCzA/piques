/* eslint-disable */
export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Role.associate = (models) => {
    const { UserRole } = models;

    Role.hasMany(UserRole, {
      foreignKey: 'roleId'
    })
  };
  return Role;
};
