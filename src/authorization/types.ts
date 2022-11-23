import {PermissionKey} from './permission-key';
import {UserProfile} from "@loopback/security"
export interface UserPermissionsFn {
  (
    userPermissions: PermissionKey[],
    requiredPermissions: RequiredPermissions,
  ): boolean;
}

export interface MyUserProfile extends Partial<UserProfile> {
  id: string;
  email: string;
  name: string;
  permissions: PermissionKey[];
}

export interface RequiredPermissions {
  required: PermissionKey[];
}

export const UserProfileSchema = {
  type: 'object',
  required: ['email', 'password', 'name'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    name: {type: 'string'},
  },
};

export interface EProjectUserAdd  {
  id: string;
  userId: string;
};

export const ProjectUserAddSchema = {
  type: 'object',
  required: ['id', 'userId'],
  properties: {
    id: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
  },
};


export const UserRequestBody = {
  description: 'The input of create user function',
  required: true,
  content: {
    'application/json': {schema: UserProfileSchema},
  },
};

export const ProjectAddUserRequestBody = {
  description: 'The input of add user into projectg function',
  required: true,
  content: {
    'application/json': {schema: ProjectUserAddSchema},
  },
};

export const ProjectTaskAddSchema = {
  type: 'object',
  required: ['id', 'userId'],
  properties: {
    projectId: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
};

export const ProjectAddTaskRequestBody = {
  description: 'The input of add task into project function',
  required: true,
  content: {
    'application/json': {schema: ProjectTaskAddSchema},
  },
};

export  interface IProjectTaskAdd{
  projectId: string;
  name: string
}

export interface Credential {
  email: string;
  password: string;
  permissions: PermissionKey[];
}

export const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};
