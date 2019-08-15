import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../interfaces/permission.interface';
import { User } from '../../modules/user/user.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { UserRole } from '../enums/user-role.enum';
import { UserService } from '../../modules/user/user.service';
import { Possession } from '../enums/possession.enum';
import { Resource } from '../enums/resource.enum';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ){ }

  async validatePermissions(
    permissions: PermissionInterface[],
    user: User,
    resourceId: number
  ) {
    const results = permissions.map(async permissions =>{
      const { role, resource, possession } = permissions;
      let hasRole: boolean = true;
      let hasPossession: boolean = true;

      if (possession === Possession.OWN) {
        hasPossession = await this.userService.possess(user.id, resource, resourceId);
      }

      if (role) {
        hasRole = user.roles.some(UserRole => UserRole.name === role);
      }

      return hasRole && hasPossession;
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
      request.user,
      parseInt(request.params.id)
    );

      return results.includes(true);
  }
}
