import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthService } from './services/auth.service'
import { SignInDto } from './dto/signin.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { UserDto } from './dto/user.dto'

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('auth/signup')
  create(@Body() { email, password }: CreateUserDto) {
    return this.authService.signup(email, password)
  }

  @Post('auth/signin')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto)
  }

  @Get()
  fetchUsers() {
    return this.usersService.find(null)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
