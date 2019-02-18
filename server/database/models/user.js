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
    avatarUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    follows: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  User.associate = (models) => {
    const { UserRole, Follow } = models;

    User.hasMany(UserRole, {
      foreignKey: 'userId',
      as: 'role'
    });

    User.hasMany(Follow, {
      foreignKey: 'userId',
      as: 'following'
    });

  };
  return User;
};
