import * as functions from "firebase-functions";
import { GroupingController } from "../modules/controllers/groupingController";

export const groupingAPI = functions.https.onRequest(groupingAPIfunc);

export async function groupingAPIfunc(request: functions.Request, response: functions.Response) {
  const controller = new GroupingController();
  switch (request.method) {
    case "GET":
      response.send(await controller.get(request, response));
      return;
    default:
      response.send("");
      return;
  }
}
