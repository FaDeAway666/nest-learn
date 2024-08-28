import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { RegistUserDto } from './dto/regist-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegistUserDto) {
    return this.userService.register(registerUserDto)
  }

  @Post('login')
  login(@Body() loginUserDto: RegistUserDto) {
    return this.userService.login(loginUserDto)
  }
}
