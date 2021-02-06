import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { chooseItemsRandomly } from "../util";

export class FreeChoiceController extends BaseController {
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
    return chooseItemsRandomly(parsedGroup, parseInt(amount as string));
  }
}
