export default (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    organizationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Follow.associate = (models) => {
    const {
      User,
      Organization
    } = models;

    Follow.belongsTo(User, {
      foreignKey: 'userId'
    });

    Follow.belongsTo(Organization, {
      foreignKey: 'organizationId',
    });
  };
  return Follow;
};
