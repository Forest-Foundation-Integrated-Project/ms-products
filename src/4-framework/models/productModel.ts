const dynamoose = require("dynamoose");
import { SchemaDefinition } from 'dynamoose/dist/Schema'

const schema: SchemaDefinition = {
  pk: {
    type: String,
    hashKey: true,
    required: true,
    index: {
      name: 'productsCreatedAt',
      type: 'global',
      rangeKey: 'createdAt',
    }
  },
  sk: {
    type: String,
    rangeKey: true,
    required: true,
  },
  productId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  priceCents: {
    type: Number,
    required: true
  },
  tagId: {
    type: String,
    required: false
  },
  sellerId: {
    type: String,
    required: true,
    index: {
      name: 'userProductsIndex',
      type: 'global'
    },
  },
  seller: {
    type: Object,
    schema: {
      name: {
        type: String,
        required: true
      }
    }
  }
}

export const ProductModel = dynamoose.model('Products', new dynamoose.Schema(schema, { timestamps: true }));
