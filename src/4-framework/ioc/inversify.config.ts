import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelsModule } from './modelsModule'
import { UseCasesModule } from './useCasesModule'

import { sequelize } from '../utility/database'
import { container } from '../shared/ioc/container'

container.bind('sequelize').toConstantValue(sequelize)
container.load(RepositoryModule)
container.load(ModelsModule)
container.load(UseCasesModule)
container.load(OperatorModule)
