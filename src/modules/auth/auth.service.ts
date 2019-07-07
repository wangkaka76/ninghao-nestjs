import { Injectable } from '@nestjs/common';
import { UserService } from '../../../dist/modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }
}
