export default (sequelize, DataTypes) => {
  const UserOrganization = sequelize.define('UserOrganization', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    organizationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  UserOrganization.associate = (models) => {
    const {
      User,
      Organization
    } = models;

    UserOrganization.belongsTo(User, {
      foreignKey: 'userId'
    });

    UserOrganization.belongsTo(Organization, {
      foreignKey: 'organizationId'
    });
  };
  return UserOrganization;
};
