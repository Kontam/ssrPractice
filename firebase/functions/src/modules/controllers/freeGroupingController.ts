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

    const randomSortedGroups = randomSort(group as string[]);
    return splitArray(randomSortedGroups, +amount!);
  }
}
