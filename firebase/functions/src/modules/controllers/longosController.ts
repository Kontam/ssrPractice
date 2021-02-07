import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { LongosModel } from "../models/LongosModel";

export class LongosController extends BaseController {
  longosModel: LongosModel;
  constructor() {
    super();
    this.paramTypes.set("get", []);
    this.paramTypes.set("post", []);
    this.longosModel = new LongosModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const longos = await this.longosModel.getLongs();
    return longos;
  }
}
