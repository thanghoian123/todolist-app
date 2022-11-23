import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Task, TaskRelations, TaskTask} from '../models';
import {TaskTaskRepository} from './task-task.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly tasks: HasManyThroughRepositoryFactory<Task, typeof Task.prototype.id,
          TaskTask,
          typeof Task.prototype.id
        >;

  constructor(
    @inject('datasources.postgresql') dataSource: MysqlDataSource, @repository.getter('TaskTaskRepository') protected taskTaskRepositoryGetter: Getter<TaskTaskRepository>, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Task, dataSource);
    this.tasks = this.createHasManyThroughRepositoryFactoryFor('tasks', 
    Getter.fromValue(this),
     taskTaskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
