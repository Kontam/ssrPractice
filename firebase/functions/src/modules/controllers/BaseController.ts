import { Request, Response } from "firebase-functions";
import { checkHttpHeaders } from "../checkHttpHeaders";
import { filterValidParametors, ParamTypeMap } from "../filterValidParametors";

export class BaseController {
  paramTypes: Map<"get" | "post" | "patch" | "delete", ParamTypeMap[]>;
  constructor() {
    this.paramTypes = new Map();
  }

  get(req: Request, res: Response): any {
    if (!process.env.FUNCTIONS_EMULATOR && !checkHttpHeaders(req, res))
      return res.send({ error: true, message: "invalid api token" });

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
    if (!checkHttpHeaders(req, res))
      return res.send({ error: true, message: "invalid api token" });

    const paramType = this.paramTypes.get("get");
    if (!paramType) {
      console.error("get paramtypes are undefined");
      return;
    }

    const invalidParams = filterValidParametors(req, paramType);
    if (invalidParams.length === 0) return;
    console.error("bad request");
  }
}
