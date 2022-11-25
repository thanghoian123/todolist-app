import {
  AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy, TokenService
} from '@loopback/authentication';
import { inject } from '@loopback/core';
import { HttpErrors, Request } from '@loopback/rest';
import { MyAuthBindings } from '../keys';
import {
  MyUserProfile,
  UserPermissionsFn
} from '../types';

export class JWTStrategy implements AuthenticationStrategy{
  name: string = 'jwt';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata,
    @inject(MyAuthBindings.USER_PERMISSIONS)
    protected checkPermissons: UserPermissionsFn,
    @inject(MyAuthBindings.TOKEN_SERVICE)
    protected tokenService: TokenService,
  ) {}
  async authenticate(request: Request): Promise<MyUserProfile | any> {
    const token: string = this.extractCredentials(request);
    console.log("🚀 ~ file: JWT.strategy.ts ~ line 26 ~ JWTStrategy ~ authenticate ~ token", token)
    try{
      const user: Partial<MyUserProfile> = await this.tokenService.verifyToken(token);
      console.log("🚀 ~ file: JWT.strategy.ts ~ line 28 ~ JWTStrategy ~ authenticate ~ user", user)
      return user;
    } catch (err: any) {
      Object.assign(err, {code: 'INVALID_ACCESS_TOKEN', statusCode: 401,});
      throw err;
    }
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
      const token = parts[1];
      return token;
  }
}

export class CustomStrategy implements AuthenticationStrategy{
  name: string = 'custom';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata,
    @inject(MyAuthBindings.USER_PERMISSIONS)
    protected checkPermissons: UserPermissionsFn,
    @inject(MyAuthBindings.TOKEN_SERVICE)
    protected tokenService: TokenService,
  ) {}
  async authenticate(request: Request): Promise<any> {
    const token: string = this.extractCredentials(request);
    console.log("🚀 ~ file: JWT.strategy.ts ~ line 71 ~ CustomStrategy ~ authenticate ~ token", token)
    try{
      const user: MyUserProfile = await this.tokenService.verifyToken(token) as unknown as MyUserProfile;
      console.log("🚀 ~ file: JWT.strategy.ts ~ line 28 ~ JWTStrategy ~ authenticate ~ user", user)
      return user;
    } catch (err : any) {
      Object.assign(err, {code: 'INVALID_ACCESS_TOKEN', statusCode: 401,});
      throw err;
    }
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
      const token = parts[1];
      return token;
  }
}
