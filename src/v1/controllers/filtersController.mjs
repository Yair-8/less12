import TypesDBService from "../models/type/TypesDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";
import ProductsDBService from "../models/product/ProductsDBService.mjs";

class FilterService {
  static async getFiltersData(req, res) {
    try {
      // Виконання запитів паралельно з використанням Promise.all
      const [typesList, usersList, productsList] = await Promise.all([
        TypesDBService.getList(),
        UsersDBService.getListWithoutAdmin(),
        //   UsersDBService.getList(),
        ProductsDBService.getList(),
      ]);

      // Повернення об'єднаних даних
      res.status(200).json({
        data: {
          types: typesList,
          users: usersList,
          products: productsList,
        },
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  }
}

export default FilterService;
