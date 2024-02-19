import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToInstance } from 'class-transformer'

interface ClassContructor {
    new(...args: any[]): NonNullable<unknown>
}

export const Serialize = (dto: ClassContructor) => {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private readonly dto: ClassContructor) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}