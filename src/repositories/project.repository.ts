import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Project, ProjectRelations, User, ProjectUser, Task} from '../models';
import {ProjectUserRepository} from './project-user.repository';
import {UserRepository} from './user.repository';
import {TaskRepository} from './task.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          ProjectUser,
          typeof Project.prototype.id
        >;

  public readonly tasks: HasManyRepositoryFactory<Task, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: MysqlDataSource, 
    @repository.getter('ProjectUserRepository') 
    protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
    @repository.getter('UserRepository') 
    protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Project, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.users = this.createHasManyThroughRepositoryFactoryFor('users', 
      userRepositoryGetter, 
      projectUserRepositoryGetter,
    );
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
