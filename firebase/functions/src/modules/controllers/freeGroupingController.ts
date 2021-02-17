import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { randomSort } from "../randomSort";
import { splitArray } from "../splitArray";

export class FreeGroupingController extends BaseController {
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["group", "array"],
      ["amount", "string"]
    ]);
    this.paramTypes.set("post", []);
  }

  get(req: Request, res: Response) {
    super.get(req, res);
    const { group, amount } = req.query;

    const parsedGroup = (group as string[]).map(str => JSON.parse(str)); 

    const randomSortedGroups = randomSort(parsedGroup);
    return splitArray(randomSortedGroups, +amount!);
  }

  post(req: Request, res: Response) {
    super.post(req, res);
    const { group, amount } = req.body;

    const randomSortedGroups = randomSort(group);
    return splitArray(randomSortedGroups, +amount);
  }
}
