module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "place",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      address_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_group_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_group_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      road_address_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      y: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
