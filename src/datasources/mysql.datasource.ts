import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
// import * as config from './mysql.datasource.json';
const config= {
  "name": "db",
  "connector": "postgresql",
  "url": "",
  "host": "localhost",
  "port": 5432,
  "user": "postgres",
  "password": "123456a@",
  "database": "todolist"
}

export class MysqlDataSource extends juggler.DataSource {
  static dataSourceName = 'postgresql';

  constructor(
    @inject('datasources.config.postgresql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
