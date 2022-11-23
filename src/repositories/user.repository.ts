import {
    DefaultCrudRepository,
} from '@loopback/repository';
  import {User} from '../models';
  import {MysqlDataSource} from '../datasources';
  import {Getter, inject} from '@loopback/core';
  
  export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id
  > {
    constructor(
      @inject('datasources.postgresql') dataSource: MysqlDataSource,
    ) {
      super(User, dataSource);
    }
  }
  