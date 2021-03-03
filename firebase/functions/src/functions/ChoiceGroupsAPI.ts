import * as functions from "firebase-functions";
import { ChoiceGroupsController } from "../modules/controllers/ChoiceGroupController";

async function choiceGroupsAPIfunc(
  request: functions.Request,
  response: functions.Response
): Promise<void> {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // localhostを許可
  response.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST"); // DELETEだけは拒否
  response.set("Access-Control-Allow-Headers", "X-Api-Key"); // Content-Typeのみを許可

  const controller = new ChoiceGroupsController();
  switch (request.method) {
    case "GET":
      response.send(await controller.get(request, response));
      break;

    case "POST":
      response.send(await controller.post(request, response));
      break;

    case "PATCH":
      response.send(await controller.patch(request, response));
      break;

    case "DELETE":
      response.send(await controller.delete(request, response));
      break;
    default:
      response.send("default");
  }
}

export const choiceGroupsAPI = functions.https.onRequest(choiceGroupsAPIfunc);
