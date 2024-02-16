import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthService } from './services/auth.service'
import { SignInDto } from './dto/signin.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { UserDto } from './dto/user.dto'
import { CurrentUser } from './current-user.decorator'
import { User } from './entities/user.entity'
import { GuardRoute } from 'src/guards/auth.guard'
import { CheckAdministrativeAccess } from 'src/guards/admin.guard'

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Post('auth/signup')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto)
    session.userId = user.id
    return user
  }

  @Post('auth/signin')
  async signin(@Body() signInDto: SignInDto, @Session() session: any) {
    const user = await this.authService.signin(signInDto)
    session.userId = user.id
    return user
  }

  @Post('auth/signout')
  async signout(@Session() session: any) {
    session.userId = null
  }

  @Get('profile')
  @GuardRoute()
  async user(@CurrentUser() user: User) {
    return user
  }

  @Get()
  @GuardRoute()
  @CheckAdministrativeAccess()
  fetchUsers() {
    return this.usersService.find(null)
  }


  @Patch('auth/:id/update')
  @GuardRoute()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id/delete')
  @GuardRoute()
    // @CheckAdministrativeAccess()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
