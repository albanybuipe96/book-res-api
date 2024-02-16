import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { create } from 'domain'


export const CurrentBook = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.currentBook
    }
)