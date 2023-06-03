<<<<<<< HEAD
import { injectable, inject } from 'inversify'
import { IProductRepository } from '../../2-business/repositories/iProductRepository'
import { ProductModel } from '../models/productModel'
import { IProductEntity } from '../../1-domain/entities/productEntity'
import { InputUpdateProductDto } from '../../2-business/dto/productDto'
import { isNotEmpty } from 'class-validator'
import { Sequelize } from 'sequelize/types/sequelize'

@injectable()
export class ProductRepository implements IProductRepository {
  public constructor(@inject(ProductModel) private productModel: typeof ProductModel) {}

  async create(productEntity: IProductEntity): Promise<IProductEntity> {
    const createResponse = await this.productModel.create({
      product_id: productEntity.product_id,
      name: productEntity.name,
      description: productEntity.description,
      seller_id: productEntity.seller_id,
      price_cents: productEntity.price_cents,
      tag_id: productEntity.tag_id
    })

    return createResponse.dataValues
  }

  async view(product_id: string): Promise<IProductEntity> {
    const viewResponse = await this.productModel.findByPk(product_id)

    return viewResponse?.dataValues
  }

  async remove(remove_id: string): Promise<boolean> {
    const removeResponse = await this.productModel.destroy({
      where: {product_id: remove_id}
    });

    return !!removeResponse
  }

  async update(productEntity: InputUpdateProductDto): Promise<IProductEntity> {
    await this.productModel.update(
      { name: productEntity.name,
        description: productEntity.description,
        seller_id: productEntity.seller_id,
        price_cents: productEntity.price_cents,
        tag_id: productEntity.tag_id},
      {where: {product_id: productEntity.product_id}}
      )

    const updateResponse = await this.productModel.findByPk(productEntity.product_id)

    return updateResponse?.dataValues
  }

  async viewAll(name?: string, created?: string): Promise<IProductEntity[]> {
    
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    let viewAllResponse: any[];

    created == null? created = 'ASC' : created = created;
  
    if(name != null) {
      viewAllResponse = await this.productModel.findAll(
        {
          where: {
            name: {
              [Op.like]: `%${name}%`
            },
          },
          order: [
            ['createdAt', `${created}`]
          ]
        }    
      );
    }
    else {
        viewAllResponse = await this.productModel.findAll({
          order: [
            [ 'createdAt', `${created}`]
          ]
        });
    }
    return viewAllResponse;
  }
}
=======
import { injectable, inject } from 'inversify'
import { IProductRepository } from '../../2-business/repositories/iProductRepository'
import { ProductModel } from '../models/productModel'
import { IProductEntity } from '../../1-domain/entities/productEntity'
import { InputUpdateProductDto } from '../../2-business/dto/productDto'
import { isNotEmpty } from 'class-validator'
import { Sequelize } from 'sequelize/types/sequelize'

@injectable()
export class ProductRepository implements IProductRepository {
  public constructor(@inject(ProductModel) private productModel: typeof ProductModel) {}

  async create(productEntity: IProductEntity): Promise<IProductEntity> {
    const createResponse = await this.productModel.create({
      product_id: productEntity.product_id,
      name: productEntity.name,
      description: productEntity.description,
      seller_id: productEntity.seller_id,
      price_cents: productEntity.price_cents,
      tag_id: productEntity.tag_id
    })

    return createResponse.dataValues
  }

  async view(product_id: string): Promise<IProductEntity> {
    const viewResponse = await this.productModel.findByPk(product_id)

    return viewResponse?.dataValues
  }

  async remove(remove_id: string): Promise<boolean> {
    const removeResponse = await this.productModel.destroy({
      where: {product_id: remove_id}
    });

    return !!removeResponse
  }

  async update(productEntity: InputUpdateProductDto): Promise<IProductEntity> {
    await this.productModel.update(
      { name: productEntity.name,
        description: productEntity.description,
        seller_id: productEntity.seller_id,
        price_cents: productEntity.price_cents,
        tag_id: productEntity.tag_id},
      {where: {product_id: productEntity.product_id}}
      )

    const updateResponse = await this.productModel.findByPk(productEntity.product_id)

    return updateResponse?.dataValues
  }

  async viewAll(name?: string): Promise<IProductEntity[]> {
    
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    let viewAllResponse: any[];
    
    if(name != null) {
      viewAllResponse = await this.productModel.findAll(
        {
          where: {
            name: {
              [Op.like]: `%${name}%`
            }
          }
        }
      );
    }
    else 
       viewAllResponse = await this.productModel.findAll();
    
    return viewAllResponse
  }
}
>>>>>>> 3ff0e94 (feat: add search by name)
