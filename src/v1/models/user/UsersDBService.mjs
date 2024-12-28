import User from "./User.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class UsersDBService extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const res = await super.getList(filters, { password: 0 }, [
        { fieldForPopulation: "type", requiredFieldsFromTargetObject: "title" },
      ]);
      // Log the result to inspect the structure
      console.log("Fetched and populated users:", res);
      return res;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
  async getListWithoutAdmin(filters = {}) {
    try {
      const adminType = await TypesDBService.findOne({ title: "admin" });
      const res = await super.getList(
        { ...filters, type: { $ne: adminType._id } },
        { password: 0 },
        [
          {
            fieldForPopulation: {
              path: "type",
              select: "title",
            },
          },
        ]
      );

      return res;
    } catch (error) {
      return [];
    }
  }
}

export default new UsersDBService(User);
