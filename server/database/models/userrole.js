export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  UserRole.associate = (models) => {
    const {
      User,
      Role
    } = models;

    UserRole.belongsTo(User, {
      foreignKey: 'userId'
    });

    UserRole.belongsTo(Role, {
      foreignKey: 'roleId'
    });
  };
  return UserRole;
};
