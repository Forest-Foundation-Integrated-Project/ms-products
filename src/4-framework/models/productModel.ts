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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    price_cents: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.UUIDV4,
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
