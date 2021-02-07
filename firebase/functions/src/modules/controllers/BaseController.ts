import { Request, Response } from "firebase-functions";
import { checkHttpHeaders } from "../checkHttpHeaders";
import { filterValidParametors, ParamTypeMap } from "../filterValidParametors";

export type BaseMethods = "get" | "post" | "patch" | "delete"; 

export class BaseController {
  paramTypes: Map<BaseMethods, ParamTypeMap[]>;
  constructor() {
    this.paramTypes = new Map();
  }

  get(req: Request, res: Response): any {
    this._setup(req, res, 'get');

    const paramType = this.paramTypes.get("get");
    if (!paramType) {
      console.error("get paramtypes are undefined");
      return; 
    }

    const invalidParams = filterValidParametors(req, paramType);
    if (invalidParams.length === 0) return;
    console.error("bad request");
    //TODO: error procedure
  }

  post(req: Request, res: Response): any {
    this._setup(req, res, 'post');
    const paramType = this.paramTypes.get("post");
    if (!paramType) {
      console.error("get paramtypes are undefined");
      return;
    }

    const invalidParams = filterValidParametors(req, paramType);
    if (invalidParams.length === 0) return;
    console.error("bad request");
  }

  _setup(req: Request, res: Response, method: BaseMethods) {
    if (!process.env.FUNCTIONS_EMULATOR && !checkHttpHeaders(req, res))
      return;
  }
}
