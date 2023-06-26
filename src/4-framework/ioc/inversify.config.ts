import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelsModule } from './modelsModule'
import { UseCasesModule } from './useCasesModule'
import { ServicesModule } from './servicesModule'

import { container } from '../shared/ioc/container'

container.load(RepositoryModule)
container.load(ModelsModule)
container.load(UseCasesModule)
container.load(OperatorModule)
container.load(ServicesModule)
