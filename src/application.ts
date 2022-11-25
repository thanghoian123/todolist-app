import { BootMixin } from "@loopback/boot";
import { ApplicationConfig, createBindingFromClass } from "@loopback/core";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import {
  RestExplorerBindings,
  RestExplorerComponent
} from "@loopback/rest-explorer";
import { ServiceMixin } from "@loopback/service-proxy";
import * as path from "path";
import { MySequence } from "./sequence";
//add
import {
  AuthenticationComponent,
  registerAuthenticationStrategy
} from "@loopback/authentication";
import {
  JWTAuthenticationComponent,
  UserServiceBindings
} from "@loopback/authentication-jwt";
import { CronComponent } from "@loopback/cron";
import {
  CustomStrategy,
  JWTService,
  JWTStrategy,
  MyAuthBindings,
  UserPermissionsProvider
} from "./authorization";
import { MyCronJob } from "./cron/MyCronJob";
import { MysqlDataSource } from "./datasources";
export class FirstgameApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Binding Cron components for cron jobs inside the constructor of Application class
    this.component(CronComponent);
    // this.bind("cron.job")
    //   .to(job)
    //   .apply(asCronJob);
    this.add(createBindingFromClass(MyCronJob));
    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(MysqlDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind JWT & permission authentication strategy related elements
    registerAuthenticationStrategy(this as any, JWTStrategy as any);
    registerAuthenticationStrategy(this as any, CustomStrategy as any);
    this.bind(MyAuthBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(MyAuthBindings.USER_PERMISSIONS).toProvider(
      UserPermissionsProvider
    );
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: "/explorer",
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };
  }
}
