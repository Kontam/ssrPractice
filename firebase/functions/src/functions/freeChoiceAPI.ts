import * as functions from "firebase-functions";
import { FreeChoiceController } from "../modules/controllers/freeChoiceController";
import {errorResponse} from "../modules/errorResponse";

export const freeChoiceAPI = functions.https.onRequest(freeChoiceAPIfunc);

export async function freeChoiceAPIfunc(
  request: functions.Request,
  response: functions.Response
) {
  const controller = new FreeChoiceController();
  try {
    switch (request.method) {
      case "GET":
        response.send(controller.get(request, response));
        return;
      default:
        response.send("");
        return;
    }
  } catch (e) {
    errorResponse(e, response);
  }
}
