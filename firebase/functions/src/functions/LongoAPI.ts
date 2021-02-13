import * as functions from "firebase-functions";
import { LongosController } from "../modules/controllers/longosController";

export const longoAPI = functions.https.onRequest(longoAPIfunc);

export async function longoAPIfunc(
  request: functions.Request,
  response: functions.Response
): Promise<void> {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // localhostを許可
  response.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST"); // DELETEだけは拒否
  response.set("Access-Control-Allow-Headers", "X-Api-Key"); // Content-Typeのみを許可
  //if (!checkHttpHeaders(request, response)) return;
  const controller = new LongosController();

  try {
    switch (request.method) {
      case "GET":
        response.send(await controller.get(request, response));
        break;

      case "PATCH":
        response.send(await controller.patch(request, response));
        break;

      case "POST":
        response.send(await controller.post(request, response));
        break;

      case "DELETE":
        response.send(await controller.delete(request, response));
        break;

      default:
        response.send("without method");
    }
  } catch (e) {
    if (e.response) {
      response.status(401).send(e.response);
    } else {
      console.error(e);
    }
  }
}
