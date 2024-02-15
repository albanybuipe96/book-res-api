import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common'
import { Observable } from 'rxjs'

export const CheckAdministrativeAccess = () => UseGuards(AdminGhard)

export class AdminGhard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        if (!request.currentUser) {
            return false
        }

        return request.currentUser.admin
    }
}