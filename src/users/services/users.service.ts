import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ErrorMessages } from 'src/constants/errors.constants'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const user = await this.repo.create(createUserDto)
    return this.repo.save(user)
  }

  find(email: string) {
    return this.repo.find({ where: { email } })
  }

  async findOne(id: number) {
    const [user] = await this.repo.find({ where: { id } })
    if (!user) {
      return null
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.repo.find({ where: { id } })
    if (!user) {
      throw new NotFoundException(ErrorMessages.NO_USER_FOUND)
    }

    user.firstname = updateUserDto.firstname
    user.lastname = updateUserDto.lastname
    user.email = updateUserDto.email
    user.admin = updateUserDto.admin
    user.profile = updateUserDto.profile
    user.interests = updateUserDto.interests

    return this.repo.save(user)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
