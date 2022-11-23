import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Project, ProjectRelations, User, ProjectUser} from '../models';
import {ProjectUserRepository} from './project-user.repository';
import {UserRepository} from './user.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          ProjectUser,
          typeof Project.prototype.id
        >;

  constructor(
    @inject('datasources.mongo') dataSource: MysqlDataSource, 
    @repository.getter('ProjectUserRepository') 
    protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
    @repository.getter('UserRepository') 
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Project, dataSource);
    this.users = this.createHasManyThroughRepositoryFactoryFor('users', 
      userRepositoryGetter, 
      projectUserRepositoryGetter,
    );
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
