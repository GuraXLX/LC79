import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // In a real app, we would check request.user.role here
    // For now, we'll allow all requests but log it (Placeholder)
    // To enforcing security, we need JWT Auth implemented first.
    return true;
  }
}
