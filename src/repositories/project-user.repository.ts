import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProjectUser, ProjectUserRelations} from '../models';

export class ProjectUserRepository extends DefaultCrudRepository<
  ProjectUser,
  typeof ProjectUser.prototype.getId,
  ProjectUserRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: MysqlDataSource,
  ) {
    super(ProjectUser, dataSource);
  }
}
