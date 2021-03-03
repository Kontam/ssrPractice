import * as functions from "firebase-functions";
import { FreeChoiceController } from "../modules/controllers/freeChoiceController";

export const freeChoiceAPI = functions.https.onRequest(freeChoiceAPIfunc);

export async function freeChoiceAPIfunc(
  request: functions.Request,
  response: functions.Response
) {
  const controller = new FreeChoiceController();
  switch (request.method) {
    case "GET":
      response.send(controller.get(request, response));
      return;
    default:
      response.send("");
      return;
  }
}
