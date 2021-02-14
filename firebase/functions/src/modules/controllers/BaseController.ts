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
    this.paramTypes.set("get", [])
    this.paramTypes.set("post", [])
    this.paramTypes.set("patch", [])
    this.paramTypes.set("delete", [])
    this.bodyTypes.set("post", [])
    this.bodyTypes.set("patch", [])
  }

  get(req: Request, res: Response): any {
    this._setup(req, res, 'get');
  }

  post(req: Request, res: Response): any {
    this._setup(req, res, 'post');
    this._checkBody(req, 'post');
  }

  patch(req: Request, res: Response): any {
    this._setup(req, res, 'patch');
    this._checkBody(req, 'patch');
  }

  delete(req: Request, res: Response): any {
    this._setup(req, res, 'delete');
  }

  _setup(req: Request, res: Response, method: BaseMethods) {
    if (!process.env.FUNCTIONS_EMULATOR && !checkHttpHeaders(req))
      return;

    const paramType = this.paramTypes.get(method);
    if (!paramType) 
      throw new SuebotAPIExeption(`${method} query parameters are undefined`);

    const invalidQuery = filterValidParametors(req.query, paramType);
    if (invalidQuery.length === 0) return;
    throw new SuebotAPIExeption(`invalid: ${invalidQuery[0][0]}`)
  }

  _checkBody(req: Request, method: "post" | "patch") {
    const bodyType = this.bodyTypes.get(method); 
    if (!bodyType) 
      throw new SuebotAPIExeption(`${method} body parameters are undefined`);
    
    const invalidBody = filterValidParametors(req.body, bodyType);
    if (invalidBody.length === 0) return;
    throw new SuebotAPIExeption(`invalid body: ${invalidBody[0][0]}`)
  }
}
