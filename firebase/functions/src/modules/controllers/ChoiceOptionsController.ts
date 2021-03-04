import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { ChoiceGroupsModel } from "../models/choiceGroupsModel";
import { SuebotAPIExeption } from "../../classes/SuebotAPIException";
import { chooseItemsRandomly } from "../../modules/util";

export class ChoiceOptionsController extends BaseController {
  choiceGroupsModel: ChoiceGroupsModel;
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["groupName", "string"],
      ["amount", "string"],
    ]);
    this.paramTypes.set("post", []);
    this.paramTypes.set("patch", []);
    this.paramTypes.set("delete", []);
    this.choiceGroupsModel = new ChoiceGroupsModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const { groupName, amount } = req.query;
    const options = await this.choiceGroupsModel.getOptionsByGroupName(
      groupName as string
    );
    if (!options) {
      throw new SuebotAPIExeption("invalid groupName");
    }
    const enableOptions = options.filter((option) => option.choiceEnabled);
    const choosenOptions = chooseItemsRandomly(enableOptions, +amount);
    const response: string[] = choosenOptions.map(
      (option) => option.choiceName
    );
    return response;
  }

  /*
  async post(req: Request, res: Response) {
    super.post(req, res);
    const posted = await this.choiceOptionsModel.postChoiceGroup(req.body);
    return posted;
  }

  async patch(req: Request, res: Response) {
    super.patch(req, res);
    const updated = await this.choiceOptionsModel.patchChoiceGroup(req.body);
    return updated;
  }

  async delete(req: Request, res: Response) {
    super.delete(req, res);
    const deleted = await this.choiceOptionsModel.deleteChoiceGroup(req.query.groupId as string);
    return deleted;
  }
 */
}
