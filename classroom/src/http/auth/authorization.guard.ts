import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

import { auth } from 'express-oauth2-jwt-bearer';
import { promisify } from 'node:util';
import { GqlExecutionContext } from '@nestjs/graphql';

// promisify -> Converte uma funcao que usa padrao async de callbacks para promises

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      auth({
        audience: 'ignite-lab-root-auth',
        issuerBaseURL: 'https://ignite-lab-root.us.auth0.com/',
        tokenSigningAlg: 'RS256',
        jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
    );

    try {
      await checkJWT(req, res);

      return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error,
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }
}
