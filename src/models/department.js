"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Department.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by_email",
      });
      Department.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by_email",
      });
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      fax: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      company_id: DataTypes.STRING,
      is_warehouse: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "Department",
    }
  );
  return Department;
};
