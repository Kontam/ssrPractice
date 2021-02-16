import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { AuthorityModel } from "../models/AuthorityModel";

export class AuthorityController extends BaseController {
  authorityModel: AuthorityModel;
  constructor() {
    super();
    this.paramTypes.set("get", [["email", "string"]]);
    this.authorityModel = new AuthorityModel();
  }

  async get(req: Request, res: Response) {
    super.get(req, res);
    const authority = await this.authorityModel.getAuthority(req.query.email as string);
    return authority;
  }
}
