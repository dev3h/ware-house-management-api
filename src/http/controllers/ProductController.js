import { badRequest, internalServerError } from "../middlewares/handle_error";
import ProductRequest from "../requests/ProductRequest";
import ProductService from "../../services/ProductServices";

class ProductController {
  static async getAll(req, res) {
    try {
      const response = await ProductService.getAll(req.query);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async create(req, res) {
    ProductRequest(req, res, async () => {
      try {
        const fileData = req.file;
        const response = await ProductService.create(req.body, fileData);
        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async getOne(req, res) {
    try {
      const response = await ProductService.getOne(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  static async update(req, res) {
    ProductRequest(req, res, async () => {
      try {
        const fileData = req.file;
        const response = await ProductService.update(req.body, fileData);

        return res.status(200).json(response);
      } catch (error) {
        return internalServerError(res);
      }
    });
  }

  static async destroy(req, res) {
    try {
      const response = await ProductService.destroy(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }

  // EXPORT
  static async exportExcel(req, res) {
    try {
      const response = await ProductService.exportExcel(res);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

export default ProductController;
