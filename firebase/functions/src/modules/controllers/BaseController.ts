import { Request, Response } from "firebase-functions";
import { checkHttpHeaders } from "../checkHttpHeaders";
import { filterValidParametors, ParamTypeMap } from "../filterValidParametors";
import { SuebotAPIExeption } from '../../classes/SuebotAPIException';

export type BaseMethods = "get" | "post" | "patch" | "delete"; 

export class BaseController {
  paramTypes: Map<BaseMethods, ParamTypeMap[]>;
  bodyTypes: Map<"post" | "patch", ParamTypeMap[]>;
  constructor() {
    this.paramTypes = new Map();
    this.bodyTypes = new Map();
  }

  get(req: Request, res: Response): any {
    this._setup(req, res, 'get');
  }

  post(req: Request, res: Response): any {
    this._setup(req, res, 'post');
  }

  patch(req: Request, res: Response): any {
    this._setup(req, res, 'patch');
  }

  delete(req: Request, res: Response): any {
    this._setup(req, res, 'delete');
  }

  _setup(req: Request, res: Response, method: BaseMethods) {
    if (!process.env.FUNCTIONS_EMULATOR && !checkHttpHeaders(req))
      return;

    const paramType = this.paramTypes.get(method);
    if (!paramType) {
      console.error(`${method} paramtypes are undefined`);
      return; 
    }
    const invalidQuery = filterValidParametors(req.query, paramType);
    if (invalidQuery.length === 0) return;
    throw new SuebotAPIExeption(`invalid: ${invalidQuery[0][0]}`)
  }
}
