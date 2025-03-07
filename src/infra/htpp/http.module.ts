import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/account/create.account.controller'
import { AuthenticateController } from './controllers/auth/auth.controller'
import { ProfileController } from './controllers/account/profile.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { UserService } from '../nest-use-case/neste-create-user-use-case'
import { ListAccountController } from './controllers/account/list.account.controller'
//import { NestUserUseCase } from '../nest-use-case/neste-create-user-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    ProfileController,
    ListAccountController
  ],
  providers: [UserService],
})
export class HttpModule {}
