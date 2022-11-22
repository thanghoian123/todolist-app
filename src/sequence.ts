import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {
  AuthenticationBindings,
  AuthenticateFn,
} from '@loopback/authentication';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    //add
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      console.log("🚀 ~ file: sequence.ts ~ line 35 ~ MySequence ~ handle ~ route", route)
      const args = await this.parseParams(request, route);
      console.log("🚀 ~ file: sequence.ts ~ line 37 ~ MySequence ~ handle ~ args", args)

      //add authentication actions
      const user = await this.authenticateRequest(request);
      console.log("🚀 ~ file: sequence.ts ~ line 41 ~ MySequence ~ handle ~ user", user)

      const result = await this.invoke(route, args);
      console.log("-----------------3")

      this.send(response, result);
    } catch (err: any) {
      if (
        err.code === 'AUTHENTICATION_STRATEGY_NOT_FOUND' ||
        err.code === 'USER_PROFILE_NOT_FOUND'
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }
      this.reject(context, err);
      return;
    }
  }
}