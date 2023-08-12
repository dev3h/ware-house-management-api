import db from "models";
import { Op } from "sequelize";
class DepartmentService {
  static async index({ page, limit, name, orderBy, orderType, ...query }) {
    try {
      const queries = {
        raw: true,
        nest: true,
      };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || 10;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      queries.order = [[orderBy || "createdAt", orderType || "DESC"]];

      if (name) {
        queries.where = {
          name: {
            [Op.like]: `%${name}%`,
          },
        };
      }
      const response = await db.Department.findAndCountAll({
        where: query,
        ...queries,

        include: [
          {
            model: db.Company,
            as: "company",
            attributes: ["id", "name"],
          },
        ],

        attributes: {
          exclude: ["company_id"],
        },
      });

      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  static async create(data) {
    try {
      const response = await db.Department.findOrCreate({
        where: { name: data.name },
        defaults: data,
      });

      return {
        error: response[1] ? 0 : 1,
        mes: response[1] ? "create success" : "create failed",
      };
    } catch (error) {
      throw error;
    }
  }
  static async show(id) {
    try {
      const response = await db.Department.findByPk(id, {
        include: [
          {
            model: db.Company,
            as: "company",
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["company_id"],
        },
      });
      return {
        error: response ? 0 : 1,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
  static async update(id, data) {
    try {
      const response = await db.Department.update(data, { where: { id } });
      return {
        error: response[0] > 0 ? 0 : 1,
        mes: response[0] > 0 ? "update success" : "update failed",
      };
    } catch (error) {
      throw error;
    }
  }
  static async destroy(id) {
    try {
      const response = await db.Department.destroy({ where: { id } });
      return {
        error: response > 0 ? 0 : 1,
        mes: response > 0 ? "delete success" : "delete failed",
      };
    } catch (error) {
      throw error;
    }
  }
}
export default DepartmentService;