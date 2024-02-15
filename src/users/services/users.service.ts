import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ErrorMessages } from 'src/constants/errors.constants'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }
  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password })
    return this.repo.save(user)
  }

  find(email: string) {
    return this.repo.find({ where: { email } })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
