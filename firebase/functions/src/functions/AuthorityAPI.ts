import * as functions from "firebase-functions";
import { AuthorityController } from "../modules/controllers/authorityController";

async function authorityAPIfunc(
  req: functions.Request,
  res: functions.Response
): Promise<void> {
  const controller = new AuthorityController();

  switch (req.method) {
    case "GET":
      res.send(await controller.get(req, res));
      break;
    default:
  }
}

export const authorityAPI = functions.https.onRequest(authorityAPIfunc);
