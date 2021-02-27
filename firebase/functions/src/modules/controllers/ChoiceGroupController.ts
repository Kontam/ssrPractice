import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { ChoiceGroupsModel } from "../models/choiceGroupsModel";

export class ChoiceGroupsController extends BaseController {
  choiceGroupsModel: ChoiceGroupsModel;
  constructor() {
    super();
    this.paramTypes.set("get", []);
    this.paramTypes.set("post", []);
    this.paramTypes.set("patch", []);
    this.paramTypes.set("delete", []);
    this.choiceGroupsModel = new ChoiceGroupsModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const choiceGroups = await this.choiceGroupsModel.getChoiceGroups();
    return choiceGroups;
  }

  async post(req: Request, res: Response) {
    super.post(req, res);
    const posted = await this.choiceGroupsModel.postChoiceGroup(req.body);
    return posted;
  }

  async patch(req: Request, res: Response) {
    super.patch(req, res);
    const updated = await this.choiceGroupsModel.patchChoiceGroup(req.body);
    return updated;
  }

  /*
  async delete(req: Request, res: Response) {
    super.delete(req, res);
    const deleted = await this.choiceGroupsModel.deleteChoiceGroup(req.body.id);
    return deleted;
  }
 */
}
