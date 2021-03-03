import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { LongosModel } from "../models/LongosModel";

export class LongosController extends BaseController {
  longosModel: LongosModel;
  constructor() {
    super();
    this.paramTypes.set("get", []);
    this.paramTypes.set("post", []);
    this.paramTypes.set("patch", []);
    this.paramTypes.set("delete", []);
    this.longosModel = new LongosModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const longos = await this.longosModel.getLongs();
    return longos;
  }

  async post(req: Request, res: Response) {
    super.post(req, res);
    const posted = await this.longosModel.postLongo(req.body);
    return posted;
  }

  async patch(req: Request, res: Response) {
    super.patch(req, res);
    const updated = await this.longosModel.patchLongo(req.body);
    return updated;
  }

  async delete(req: Request, res: Response) {
    super.delete(req, res);
    const deleted = await this.longosModel.deleteLongo(req.body.id);
    return deleted;
  }
}
