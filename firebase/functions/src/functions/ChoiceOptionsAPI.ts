import * as functions from 'firebase-functions';
import { ChoiceOptionsController } from '../modules/controllers/ChoiceOptionsController';
import {errorResponse} from '../modules/errorResponse';

async function choiceOptionsAPIfunc(req: functions.Request, res: functions.Response) {
  const controller = new ChoiceOptionsController();

  try {
    switch(req.method) {
      case "GET":
        res.send(await controller.get(req, res));
    }
  } catch (e) {
    errorResponse(e, res);
  }
}

export const choiceOptionsAPI = functions.https.onRequest(choiceOptionsAPIfunc);
