import {
  repository
} from '@loopback/repository';
import {
  get, post, requestBody
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
  
    /**
     * create character
     * @param user character
     */
    @post('/users', {
      responses: {
        '200': {
          description: 'User model instance',
          content: {'application/json': {schema: {'x-ts-type': User}}},
        },
      },
    })
    async create(
      @requestBody(UserRequestBody as any) user: User,
    ): Promise<User> {
      user.permissions = [
        PermissionKey.BASE_USER,
        PermissionKey.TASK_OWNER,
      ];
      if (await this.userRepository.exists(user.email)) {
        throw new HttpErrors.BadRequest(`This email already exists`);
      } else {
        const saveUser = await this.userRepository.create(user);
        delete saveUser.password;
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
    @authenticate('custom', {required: [PermissionKey.ViewOwnUser]})
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
          content: {'application/json': {schema: {'x-ts-type': User}}},
        },
      },
    })
    @authenticate('jwt', {required: [PermissionKey.ViewOwnUser]})
    async findById(): Promise<User> {
      const currentUser = await this.getCurrentUser();
      return await this.userRepository.findById(currentUser.email);
    }
  
   
  }
  