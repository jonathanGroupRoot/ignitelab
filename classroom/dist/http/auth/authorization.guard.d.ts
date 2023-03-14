import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
export declare class AuthorizationGuard implements CanActivate {
    private configService;
    private AUTH0_DOMAIN;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
