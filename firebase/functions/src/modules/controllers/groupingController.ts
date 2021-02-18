import { BaseController } from "./BaseController";
import { ChoiceGroupsModel } from "../models/choiceGroupsModel";
import { Request, Response } from "firebase-functions";
import { randomSort } from "../randomSort";
import { splitArray } from "../splitArray";

export class GroupingController extends BaseController {
  choiceGroupModel: ChoiceGroupsModel;
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["groupName", "string"],
      ["amount", "string"]
    ]);
    this.paramTypes.set("post", []);
    this.choiceGroupModel = new ChoiceGroupsModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const { groupName, amount } = req.query;
    const options = await this.choiceGroupModel.getOptionsByGroupName(
      groupName as string
    );

    if (!options) {
      return {
        error: true,
        message: "invalid groupName"
      };
    }

    const randomSortedOptions = randomSort(
      options.filter(option => option.choiceEnabled)
    );

    return splitArray(randomSortedOptions, +amount!);
  }
}
