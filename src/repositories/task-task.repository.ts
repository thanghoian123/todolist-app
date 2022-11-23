import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TaskTask, TaskTaskRelations} from '../models';

export class TaskTaskRepository extends DefaultCrudRepository<
  TaskTask,
  typeof TaskTask.prototype.id,
  TaskTaskRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: MysqlDataSource,
  ) {
    super(TaskTask, dataSource);
  }
}
