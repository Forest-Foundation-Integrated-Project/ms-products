import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../utility/database'

export class ProductModel extends Model {}

ProductModel.init(
  {
    product_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'products',
    timestamps: true,
    freezeTableName: true,
  }
)

ProductModel.sync()
