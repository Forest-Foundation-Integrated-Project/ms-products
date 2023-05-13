import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateProductDto {
  name: string
}

export type OutputCreateUserDto = Either<IError, IProductEntity>
