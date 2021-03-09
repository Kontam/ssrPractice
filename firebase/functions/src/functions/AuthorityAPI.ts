import * as functions from "firebase-functions";
import { AuthorityController } from "../modules/controllers/authorityController";
import {errorResponse} from "../modules/errorResponse";

async function authorityAPIfunc(
  req: functions.Request,
  res: functions.Response
): Promise<void> {
  const controller = new AuthorityController();

  try {
    switch (req.method) {
      case "GET":
        res.send(await controller.get(req, res));
        break;
      default:
    }
  } catch (e) {
    errorResponse(e, res);
  }
}

export const authorityAPI = functions.https.onRequest(authorityAPIfunc);
