/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {
  MyUserProfile,
  Credential,
  MyAuthBindings,
  PermissionKey,
  CredentialsRequestBody,
  UserRequestBody,
  UserProfileSchema,
  JWTService,
} from '../authorization';
import {
  authenticate,
  AuthenticationBindings,
} from '@loopback/authentication';
import {Getter, inject} from '@loopback/core';

export class UserController {
  constructor(
    @inject(MyAuthBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
 
  async create(@requestBody(UserRequestBody as any) user: User): Promise<User> {
    user.permissions = [PermissionKey.TASK_OWNER, PermissionKey.BASE_USER];
    if (
      await this.userRepository.findOne({
        where: {email: user.email},
      })
    ) {
      throw new HttpErrors.BadRequest(`This email already exists`);
    } else {
      const saveUser = await this.userRepository.create(user);
      // delete saveUser.password;
      return saveUser;
    }
    return this.userRepository.create(user);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {},
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody as any) credential: Credential,
  ): Promise<{token: string}> {
    const token = await this.jwtService.getToken(credential);
    return {token};
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.BASE_USER]} as any)
  async me(): Promise<MyUserProfile> {
    console.log("🚀 ~ file: user.controller.ts ~ line 101 ~ UserController ~ printCurrentUser ~ MyUserProfile")
    return this.getCurrentUser();
  }

  
}
