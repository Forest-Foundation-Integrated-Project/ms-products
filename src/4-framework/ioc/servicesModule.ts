import { ContainerModule, interfaces } from 'inversify'

import { IStorageService, IStorageServiceToken } from '../../2-business/services/iStorageService'
import { StorageService } from '../services/storageService'


export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IStorageService>(IStorageServiceToken).to(StorageService)
})
