export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    // associations can be defined here
  };
  return User;
};
