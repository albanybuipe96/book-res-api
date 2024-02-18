import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import { scrypt as _scrypt, randomBytes } from 'crypto'
// import { promisify } from 'util'
import { ErrorMessages } from 'src/constants/errors.constants'
import { SignInDto } from '../dto/signin.dto'
import { CreateUserDto } from '../dto/create-user.dto'

const promisify = f => (...args: any) => new Promise((a,b)=>f(...args, (err, res) => err ? b(err) : a(res)));

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async signup(createUserDto: CreateUserDto) {
        const { email, password, admin } = createUserDto
        const users = await this.usersService.find(email)

        if (users.length) {
            throw new BadRequestException(ErrorMessages.EMAIL_IN_USE)
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const encrypted = salt + '.' + hash.toString('hex')

        const user = await this.usersService.create(email, encrypted, admin)
        return user
    }

    async signin({ email, password }: SignInDto) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new BadRequestException(ErrorMessages.INVALID_CREDENTIAL)
        }

        const [salt, storedHash] = user.password.split('.')
        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException(ErrorMessages.INVALID_CREDENTIAL)
        }

        return user
    }
}