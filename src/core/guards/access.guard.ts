import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../interceptors/permission.interface';
import { User } from '../../modules/user/user.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){ }

  async validatePermissions(
    permissions: PermissionInterface[],
    user: User
  ) {
    const results = permissions.map(async permissions =>{
      const {role} = permissions;
      let hasRole: boolean;

      if (role) {
        hasRole = user.roles.some(UserRole => UserRole.name === role);
      }

      return hasRole;
    });

    return Promise.all(results);
  }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get(
      'permissions',
      context.getHandler()
    );

    const results = await this.validatePermissions(
      permissions,
      request.user
    );

      return results.includes(true);
  }
}
