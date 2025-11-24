import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.path; // URL final é exatamente a URL do Cloudinary
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Category;
