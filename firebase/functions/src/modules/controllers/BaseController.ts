import { Request, Response } from "firebase-functions";
import { checkHttpHeaders } from "../checkHttpHeaders";
import { filterValidParametors, ParamTypeMap } from "../filterValidParametors";
import { SuebotAPIExeption } from '../../classes/SuebotAPIException';

export type BaseMethods = "get" | "post" | "patch" | "delete"; 

export class BaseController {
  paramTypes: Map<BaseMethods, ParamTypeMap[]>;
  constructor() {
    this.paramTypes = new Map();
  }

  get(req: Request, res: Response): any {
    this._setup(req, res, 'get');
  }

  post(req: Request, res: Response): any {
    this._setup(req, res, 'post');
  }

  _setup(req: Request, res: Response, method: BaseMethods) {
    if (!process.env.FUNCTIONS_EMULATOR && !checkHttpHeaders(req))
      return;

    const paramType = this.paramTypes.get(method);
    if (!paramType) {
      console.error(`${method} paramtypes are undefined`);
      return; 
    }
    const invalidParams = filterValidParametors(req, paramType);
    if (invalidParams.length === 0) return;
    throw new SuebotAPIExeption(`invalid: ${invalidParams[0][0]}`)
  }
}
