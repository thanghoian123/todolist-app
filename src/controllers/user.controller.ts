import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get, param, post, requestBody
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
  //add
  import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { Getter, inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import {
  Credential, CredentialsRequestBody, JWTService, MyAuthBindings, MyUserProfile, PermissionKey, UserProfileSchema, UserRequestBody
} from '../authorization';
  
  export class UserController {
    constructor(
      @repository(UserRepository)
      public userRepository: UserRepository,
      @inject(MyAuthBindings.TOKEN_SERVICE)
      public jwtService: JWTService,
      @inject.getter(AuthenticationBindings.CURRENT_USER)
      public getCurrentUser: Getter<MyUserProfile>,
    ) {}
  
    
    @post('/users', {
      responses: {
        '200': {
          description: 'User model instance',
          content: {'application/json': {schema: {'x-ts-type': User}}},
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: {'x-ts-type': User}
          },
        },
      }) user: User,
    ): Promise<User> {
      user.permissions = [
        PermissionKey.BASE_USER,
        PermissionKey.TASK_OWNER,
      ];
      if (await this.userRepository.exists(user.email)) {
        throw new HttpErrors.BadRequest(`This email already exists`);
      } else {
        console.log("---vaoday")
        const saveUser = await this.userRepository.create(user) as any;
        console.log("🚀 ~ file: user.controller.ts ~ line 51 ~ UserController ~ saveUser", saveUser)
        delete saveUser['password'];
        return saveUser;
      }
    }
  
    //add
    /**
     * user login
     * @param credentials email and password
     */
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
    @authenticate('custom', {required: [PermissionKey.ViewOwnUser]} as any)
    async printCurrentUser(): Promise<MyUserProfile> {
      return this.getCurrentUser();
    }
  
    /**
     * show current character
     */
    @get('/users', {
      responses: {
        '200': {
          description: 'Character model instance',
          content: {'application/json': {schema: {type: 'array','x-ts-type': User}}},
        },
      },
    })
    async find(
      @param.filter(User) filter?: Filter<User>,
    ): Promise<User[]> {
      return  this.userRepository.find(filter);
    }
  }
  