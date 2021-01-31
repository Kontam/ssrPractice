import * as functions from "firebase-functions";
import { Request, Response } from "firebase-functions";
import { FreeGroupingController } from "../modules/controllers/freeGroupingController";

export const freeGroupingAPI = functions.https.onRequest(freeGroupingAPIfunc);

export async function freeGroupingAPIfunc(request: Request, response: Response) {
  const controller = new FreeGroupingController();
  switch (request.method) {
    case "GET":
      response.send(controller.get(request, response));
      return;
    default:
      response.send("");
      return;
  }
}
