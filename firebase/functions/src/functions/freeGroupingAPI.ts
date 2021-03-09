import * as functions from "firebase-functions";
import { FreeGroupingController } from "../modules/controllers/freeGroupingController";
import { errorResponse } from "../modules/errorResponse";

export const freeGroupingAPI = functions.https.onRequest(freeGroupingAPIfunc);

export async function freeGroupingAPIfunc(
  request: functions.Request,
  response: functions.Response
) {
  const controller = new FreeGroupingController();
  try {
    switch (request.method) {
      case "GET":
        response.send(controller.get(request, response));
        return;
      case "POST":
        response.send(controller.post(request, response));
        return;
      default:
        response.send("");
        return;
    }
  } catch (e) {
    errorResponse(e, response);
  }
}
