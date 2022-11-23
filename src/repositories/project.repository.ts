import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { MysqlDataSource } from "../datasources";
import { Project } from "../models";

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  constructor(@inject("datasources.mongo") dataSource: MysqlDataSource) {
    super(Project, dataSource);
  }
}
