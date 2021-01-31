import { BaseController } from "./BaseController";
import { ChoiceGroupModel } from "../models/choiceGroupModel";
import { Request, Response } from "firebase-functions";
import { randomSort } from "../randomSort";
import { splitArray } from "../splitArray";

export class GroupingController extends BaseController {
  choiceGroupModel: ChoiceGroupModel;
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["groupName", "string"],
      ["amount", "string"]
    ]);
    this.choiceGroupModel = new ChoiceGroupModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const { groupName, amount } = req.query;

    const options = await this.choiceGroupModel.getOptionsByGroupName(
      groupName as string
    );

    console.log('grouping', options);
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
