import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { RegistUserDto } from './dto/regist-user.dto'
import { DBService } from 'src/db/db.services'
import { User } from './entity/user.entity'

@Injectable()
export class UserService {
  @Inject(DBService)
  dbService: DBService

  async register(registerUserDto: RegistUserDto) {
    const users: User[] = await this.dbService.read()

    const exist = users.find(user => user.username === registerUserDto.username)
    if (exist) {
      throw new BadRequestException('用户名重复')
    }
    const user = new User()
    user.username = registerUserDto.username
    user.password = registerUserDto.password

    users.push(user)
    await this.dbService.write(users)

    return user
  }
}
