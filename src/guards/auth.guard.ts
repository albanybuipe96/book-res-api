import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common'
import { Observable } from 'rxjs'

export const GuardRoute = () => UseGuards(AuthGuard)

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        return request.session.userId
    }
}