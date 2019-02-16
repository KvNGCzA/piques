/* eslint-disable */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  User.associate = (models) => {
    const { UserRole, UserOrganization } = models;

    User.hasMany(UserRole, {
      foreignKey: 'userId',
      as: 'role'
    });

    User.hasMany(UserOrganization, {
      foreignKey: 'userId'
    });

  };
  return User;
};
