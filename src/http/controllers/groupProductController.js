import { badRequest, internalServerError } from "../middlewares/handle_error";
import GroupProductRequest from "../requests/GroupProductRequest";
import GroupProductService from "../../services/GroupProductServices";

class GroupProductController {
  static async getAll(req, res) {
    try {
      const response = await GroupProductService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    GroupProductRequest(req, res, async () => {
      try {
        const response = await GroupProductService.create(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await GroupProductService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    GroupProductRequest(req, res, async () => {
      try {
        const response = await GroupProductService.update(req.params.id, req.body);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await GroupProductService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default GroupProductController;
