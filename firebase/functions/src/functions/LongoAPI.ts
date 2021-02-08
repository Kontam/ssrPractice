import admin from "../modules/firebaseAdmin";
import * as functions from "firebase-functions";
import { Longo } from "../types.d";
import { checkIsEmptyById } from "../modules/util";
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

  const ref = admin.firestore().collection("Longos");
  const controller = new LongosController();

  try {
    switch (request.method) {
      case "GET":
        response.send(await controller.get(request, response));
        break;

      case "PATCH":
        const params: Longo = request.body;
        if (!(await checkIsEmptyById(ref, params.id))) {
          response.send(`${params.id} is not exist`);
          break;
        }
        await ref.doc(params.id).set(params);
        response.send(params);
        break;

      case "POST":
        response.send(await controller.post(request, response));
        break;

      case "DELETE":
        const deleteId: { id: string } = request.body;
        if (!(await checkIsEmptyById(ref, deleteId.id))) {
          response.send(`${deleteId.id} is not exist`);
          break;
        }
        //TODO: エラーチェックが公式に書いてないのでなにか考えたい
        await ref.doc(deleteId.id).delete();
        response.send(deleteId);
        break;

      default:
        console.log(request.method);
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
