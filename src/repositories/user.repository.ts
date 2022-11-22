import {
    DefaultCrudRepository,
} from '@loopback/repository';
  import {User} from '../models';
  import {MysqlDataSource} from '../datasources';
  import {Getter, inject} from '@loopback/core';
  
  export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.email
  > {
    constructor(
      @inject('datasources.mongo') dataSource: MysqlDataSource,
    ) {
      super(User, dataSource);
    }
  }
  